const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loaders: ['vue-loader'],
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
        extensions: ['.js', '.vue'],
    },

    externals: [
        'vue', 'moment', 'axios'
    ],

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
        }),
    ],
};
