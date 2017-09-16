const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = [
    merge(require('./webpack.base'), {
        entry: path.resolve(__dirname + '/src/index.js'),

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'vue-bulma-markdown-editor.min.js',
            libraryTarget: 'window',
            library: 'MarkdownEditor',
        }
    }),

    merge(require('./webpack.base'), {
        entry: path.resolve(__dirname + '/src/components/MarkdownEditor.vue'),

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'vue-bulma-markdown-editor.js',
            libraryTarget: 'umd',
            library: 'vue-bulma-markdown-editor',
            umdNamedDefine: true
        }
    })
];
