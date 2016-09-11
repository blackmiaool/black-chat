var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'client/');
var COMPONENT_DIR = path.resolve(__dirname, 'component/');
var LESS_DIR = path.resolve(__dirname, 'less/');

var LiveReloadPlugin = require('webpack-livereload-plugin');


var config = {
    entry: [
        APP_DIR + '/index.jsx'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/',
    },
    // module: {
    //     loaders: [{
    //         test: /\.jsx?/,
    //         include: APP_DIR,
    //         loaders: ['react-hot', 'jsx?harmony', 'babel']
    //     }]
    // },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: [APP_DIR, COMPONENT_DIR]
        }, {
            test: /\.less$/,
            loaders: ["style-loader", "css-loader", "less-loader"],
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'url-loader'
        }]
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".es6"]
    },
    plugins: [
        new LiveReloadPlugin({})
    ]
};
module.exports = config;