const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(require('./webpack.base'), {
    context: __dirname,

    entry: {
        'index': './src/index.js',
        'index.min': './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'vue-bulma-markdown-editor',
        libraryTarget: 'umd',
    },

    externals: [
        'vue', 'moment', 'axios'
    ],

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
        }),
    ],
});
