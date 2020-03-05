const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: path.join(__dirname,'src'),
                exclude: /node_modules/
            },{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },{
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                } 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'dist')
    }
};