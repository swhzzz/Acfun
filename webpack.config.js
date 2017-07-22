var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    entry: './acfun',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                exclude: /node-modules/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            // {
            //     test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
            //     loader: 'url-loader?limit=8192',
            // },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: "file-loader?name=img/[hash:8].[name].[ext]"
            },
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            }
        ]
    },
    watch: true,
    plugins: [
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}