var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'client/');
var COMPONENT_DIR = path.resolve(__dirname, 'component/');
var LESS_DIR = path.resolve(__dirname, 'less/');




var config = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3003',
        'webpack/hot/only-dev-server',
//         'webpack/hot/dev-server',
        APP_DIR + '/index.jsx'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
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
        new webpack.HotModuleReplacementPlugin()
    ]
};
module.exports = config;