const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = {
    context: __dirname,

    entry: ['./app.js', './stylesheet.sass'],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '/build/',
        library: 'vue-bulma-markdown-editor',
        libraryTarget: 'umd',
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },

        extensions: [
            '.js',
            '.vue'
        ],
    },

    devServer: {
        contentBase: __dirname,
        port: 2000,
    },

    module: {
        rules: [
            {
                test: /\.sass$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loaders: ['vue-loader'],
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
        }),
    ],
}
