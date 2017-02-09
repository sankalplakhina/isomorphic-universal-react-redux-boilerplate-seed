import path from 'path';

import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

import { webpackHost, webpackPort, reduxDevTools } from '../config/env';
import webpack from 'webpack';
import webpackIsomorphicToolsConfig from './webpack-isomorphic-tools';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

const webpackIsomorphicTools = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);

module.exports = {
    devtool: 'inline-source-map', // use 'cheap-inline-source-map' for faster performance
    context: path.resolve(__dirname, '..'),
    entry: {
        main: [
            `webpack-hot-middleware/client?path=http://${webpackHost}:${webpackPort}/__webpack_hmr`,
            './src/client.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: `http://${webpackHost}:${webpackPort}/assets/`,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        sourceMap: false, // disable babel sourcemaps to see the transpiled code when debugging
                        plugins: ['lodash'],
                    }
                }],
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                            localIdentName: "[local]__[hash:base64:5]",
                        },
                    },
                    "less-loader"
                ],
                // loader: 'style!css?importLoaders=2&sourceMap&localIdentName=[local]__[hash:base64:5]!less-loader'
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                            localIdentName: "[local]__[hash:base64:5]",
                        },
                    },
                ],
                // loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss',
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                    },
                },
                // loader: 'url?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                    },
                },
                // loader: 'url?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/octet-stream",
                    },
                },
                // loader: 'url?limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: ["file-loader"],
                // loader: 'file',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "image/svg+xml",
                    },
                },
                // loader: 'url?limit=10000&mimetype=image/svg+xml',
            },
            {
                test: webpackIsomorphicTools.regular_expression('images'),
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10240,
                    },
                },
                // loader: 'url-loader?limit=10240',
            },
        ],
    },
    resolve: {
        modules: [
          './',
          'node_modules',
        ],
        extensions: ['.json', '.js', '.jsx'],
    },
    plugins: [
        // hot reload
        new webpack.HotModuleReplacementPlugin(),
        // for file created by WebpackIsomorphicToolsPlugin
        new webpack.IgnorePlugin(/webpack-stats\.json$/),
        // for optimized loading of lodash modules
        new LodashModuleReplacementPlugin({
            // collections: true,
            // shorthands: true
        }),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __DEVTOOLS__: reduxDevTools,
            'process.env': {
                NODE_ENV: '"development"',
            },
        }),
        webpackIsomorphicTools.development(),
    ],
};
