import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import App from './App';
export function render(url: string | object, context: StaticRouterContext) {
  return ReactDOMServer.renderToNodeStream(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
}
