/* eslint-disable no-console */

import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import morgan from 'morgan';
import compression from 'compression';
import favicon from 'serve-favicon';
import path from 'path';
import PrettyError from 'pretty-error';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import { port, apiHost, apiPort } from 'config/env';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';

import createStore from './store/createStore';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';
import Html from './components/html/html';

const targetUrl = `http://${apiHost}:${apiPort}`;
const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true,
});

global.__CLIENT__ = false; // eslint-disable-line

app.use(compression());

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/api` });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }
  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

// setup the logger
app.use(morgan('dev', {}));

app.use('/assets', express.static(path.resolve('public/assets')));
app.use(favicon(path.join('public/static', 'favicon.ico')));

const hydrateOnClient = ({ store, res }) => {
  res.send(`<!doctype html>${
        ReactDOM.renderToStaticMarkup(
          <Html
            assets={global.webpackIsomorphicTools.assets()}
            store={store}
          />
        )}`
    );
};

const renderPage = ({ renderProps, store, res, client }) => {
  loadOnServer({ ...renderProps, store, helpers: { client } })
    .then(() => {
      const component = (
        <Provider store={store} key="provider">
          <ReduxAsyncConnect {...renderProps} />
        </Provider>
        );
      res.status(200);
      res.send(`<!doctype html>${
            ReactDOM.renderToStaticMarkup(
              <Html
                assets={global.webpackIsomorphicTools.assets()}
                component={component}
                store={store}
              />
            )}`
        );
    })
    .catch((err) => {
      console.error(err.stack);
    });
};

app.use((req, res) => {
  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphicTools.refresh();
  }

  const client = new ApiClient();
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(client, memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({
    history,
    routes: getRoutes(store),
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient({ store, res });
    } else if (renderProps) {
      global.navigator = { userAgent: req.headers['user-agent'] };
      renderPage({ renderProps, store, res, client });
    } else {
      res.status(404).send('Not found');
    }
  });
});


app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Server is up on port ${port}`);
  }
});
