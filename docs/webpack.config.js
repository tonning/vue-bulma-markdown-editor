const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(require('../webpack.base'), {
    context: __dirname,

    entry: ['./app.js', './stylesheet.sass'],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '/build/',
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },

    devServer: {
        contentBase: __dirname,
        port: 2000,
    },

    module: {
        rules: [{
            test: /\.sass$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    }
});
