var webpack = require('webpack')

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: __dirname + '/dist/assets/js',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map',
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            }
        ]
    },

    mode: 'development'
}