import fs from "fs";
import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import serveStatic from "serve-static";
import compression from "compression";
const isDev = process.env.NODE_ENV === 'development';
async function createServer(root = process.cwd()) {
  const resolve = (p:string) => path.resolve(__dirname, p);
  const indexProd = !isDev ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : '';
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  let viteConfig:any;
  if (isDev) {
    viteConfig = await createViteServer({
      root,
      logLevel: isDev ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100
        }
      }
    });
    app.use(viteConfig.middlewares);
  } else {
    app.use(compression());
    app.use(
      serveStatic(resolve('dist/client'), {
        index: false
      })
    );
  }
  app.use('*', async (req, res) => {
    try {
      const url = req.url;
      let template;
      let render;
      if (isDev) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await viteConfig.transformIndexHtml(url, template);
        render = (await viteConfig.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = indexProd;
        // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-unused-expressions
        require('./dist/server/entry-server.js').render;
      }
      const context:any = {
        isSrr:true,
        // query: req.query,
        // url: req.originalUrl,
      };
      const appHtml = render(url, context);
      if (context.url) {
        return res.redirect(301, context.url);
      }
      const html = template.replace(`<!--app-html-->`, appHtml);
      res.status(200).set({ 'Content-Type': "text/html; utf-8" }).end(html);
    } catch (e) {
      !isDev && viteConfig.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
  // @ts-ignore
  return { app, viteConfig };
}
if (isDev) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log('http://localhost:3000');
    })
  );
}
export { createServer};
