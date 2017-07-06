const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname),
    entry: {
        bundle: './demo.js',
        vendor: ['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'stage-0', 'react'] }
            }],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local][hash:base64:8]',
                {
                    loader:'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')()
                            ];
                        }
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpg|svg)$/,
            use:['url-loader?limit=25000']
        }, {
            test: /\.json$/,
            use: ['json-loader']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name][chunkhash:8].js', //开启webpack-dev-server后无法使用chunkHash，至webpack3.0依然未修复该问题
            children: true
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/index.html'),
            template: path.resolve(__dirname, './views/index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __RunMode:JSON.stringify('DEV'), //运行模式相关配置
            __Local:true //本地模式
        }),
        new webpack.NormalModuleReplacementPlugin(
            /\/iconv-loader$/, 'node-noop'
        )
    ],
    performance: { //fix the windows OS warning, the issue is local https://stackoverflow.com/questions/41159817/how-to-disable-optimize-warnings-in-webpack-2/41159932
        hints: false
    },
    devServer: {
        disableHostCheck: true
    }
}
