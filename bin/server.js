require('./../server.babel'); // babel registration (runtime transpilation for node)
const path = require('path');
const webpackIsomorphicToolsConfig = require('../webpack/webpack-isomorphic-tools');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

const rootDir = path.resolve(__dirname, '..');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .server(rootDir, () => {
    require('../src/server');
  });
