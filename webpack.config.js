const path = require('path');
const webpack = require('webpack');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/index.js', // 相对路径
    output: {
        path: path.resolve(__dirname, 'build'), // 打包文件的输出路径
        filename: 'bundle.js' // 打包文件名
    },
    devtool: false,
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
            }
        }, {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
            }
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },{
            test: /\.less$/,
            use: ['style-loader', 'css-loader']
        },{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: { limit: 8192 }
            }]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, 'build'),
        hot: true,
        client: {
            logging: 'info',
            overlay: true
        },
        port: 9000,
        proxy: {
            "/apidata": {
                target: "https://api.steampowered.com",
                pathRewrite: { '^/apidata': '/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json' },
                changeOrigin: true,
            },
            "/user": {
                target: "https://www.dtcj.com",
                pathRewrite: { '^/user': '/wechat/signature?test=1url=1' },
                changeOrigin: true
            },
            "/matchdata": {
                target: "https://api.steampowered.com",
                pathRewrite: { '^/matchdata': 'IDOTA2Match_570/GetMatchDetails/V001/?key=0C662E58BD243F9090C794507DFF4BE5&match_id=3525611894' },
                changeOrigin: true
            },
            "/heroslist": {
                target: "https://api.steampowered.com",
                pathRewrite: { '^/heroslist': 'IEconDOTA2_570/GetHeroes/v1?key=0C662E58BD243F9090C794507DFF4BE5' },
                changeOrigin: true
            },
        }
    }
};

console.log(process.env.NODE_ENV);