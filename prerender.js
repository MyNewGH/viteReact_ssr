// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
const toAbsolute = (p) => path.resolve(__dirname, p);
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { render } = require('./dist/server/entry-server.js');

const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .map((file) => {
    const name = file.replace(/\.tsx$/, '').toLowerCase();
    return name === 'home' ? `/` : `/${name}`;
  })

;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const context = {};
    const appHtml = await render(url, context);

    const html = template.replace(`<!--app-html-->`, appHtml);

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
    fs.writeFileSync(toAbsolute(filePath), html);
    console.log('pre-rendered:', filePath);
  }
})();
