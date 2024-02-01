const path    = require('path');
const webpack = require('webpack');

/**
 * @see https://webpack.js.org/configuration/
 * @type {webpack.Configuration[]}
 */
module.exports = [{
    mode   : 'development',
    entry  : './index.js',
    devtool: 'source-map',
    output : {
        filename: 'bundle.es6.js',
        path    : path.resolve(__dirname, '..', 'dist', 'webpack'),
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $     : 'jquery',
            jQuery: 'jquery',
        }),
    ],
}, {
    mode   : 'development',
    entry  : './index.js',
    devtool: 'source-map',
    output : {
        filename: 'bundle.es5.js',
        path    : path.resolve(__dirname, '..', 'dist', 'webpack'),
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $     : 'jquery',
            jQuery: 'jquery',
        }),
    ],
    module : {
        rules: [
            {
                test   : /\.js$/,
                exclude: /node_modules/,
                use    : {
                    loader : 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
}];
