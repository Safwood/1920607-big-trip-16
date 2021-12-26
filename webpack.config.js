const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: 'source-map',
    devServer: {
        hot: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            view: path.resolve(__dirname, './src/view/'),
            presenter: path.resolve(__dirname, './src/presenter/'),
            utils: path.resolve(__dirname, './src/utils/'),
            model: path.resolve(__dirname, './src/model/'),
          },
    }
}