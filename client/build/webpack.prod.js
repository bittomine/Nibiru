const path         = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack      = require("webpack");

const outputPath = path.resolve(__dirname, '..', '..', 'public', 'js', 'v4', 'webpack');

/**
 * @see https://webpack.js.org/configuration/
 * @type {webpack.Configuration[]}
 */
module.exports = [{
    mode        : 'production',
    entry       : './client/index.js',
    devtool     : false,
    output      : {
        filename: 'bundle.es6.min.js',
        path: outputPath,
    },
    resolve     : {
        extensions: ['.js'],
    },
    plugins     : [
        new webpack.ProvidePlugin({
            $     : 'jquery',
            jQuery: 'jquery',
        }),
    ],
    optimization: {
        minimize : true,
        minimizer: [new TerserPlugin()], // Minify the js code
    },
}, {
    mode        : 'production',
    entry       : './client/index.js',
    devtool     : false,
    output      : {
        filename: 'bundle.es5.min.js',
        path: outputPath,
    },
    resolve     : {
        extensions: ['.js'],
    },
    plugins     : [
        new webpack.ProvidePlugin({
            $     : 'jquery',
            jQuery: 'jquery',
        }),
    ],
    optimization: {
        minimize : true,
        minimizer: [new TerserPlugin()],  // Minify the js code
    },
    module      : {
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
