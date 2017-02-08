require('./../server.babel'); // babel registration (runtime transpilation for node)

const path = require('path');
const autoprefixer = require('autoprefixer');

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { webpackHost, webpackPort, reduxDevTools } = require('../config/env');
const webpack = require('webpack');
const webpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const webpackIsomorphicTools = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        main: [
            './src/client.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/assets/',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    plugins: ['lodash'],
                },
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&sourceMap!less-loader')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss'
                ),
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml',
            },
            {
                test: webpackIsomorphicTools.regular_expression('images'),
                loader: 'url-loader?limit=10240',
            },
        ],
    },
    postcss() {
        return [autoprefixer];
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            './',
            'node_modules',
        ],
        extensions: ['', '.json', '.js', '.jsx'],
    },
    plugins: [
        new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
            __CLIENT__: true,
            __DEVTOOLS__: false,
        }),
        new LodashModuleReplacementPlugin({
            // collections: true,
            // shorthands: true
        }),

        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        webpackIsomorphicTools,
    ],
};
