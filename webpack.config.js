const path = require('path');
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
})
