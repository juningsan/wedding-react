const path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './src/index.js', //相对路径
    output: {
        path: path.resolve(__dirname, 'build'), //打包文件的输出路径
        filename: 'bundle.js' //打包文件名
    },
    devtool: false,
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },{
            test: /\.less$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            ]
        }]
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //     'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: process.env.NODE_ENV === 'production'
    // })
  ],
    devServer: {
        historyApiFallback: true,
        // contentBase: path.resolve(__dirname, '/build'),
        contentBase: __dirname+"/build",
//         contentBase: "./public",
        hot: true,
        inline: true,
        // headers: { "Access-Control-Allow-Origin": "*" },
        // headers:{'Access-Control-Allow-Origin': '*'  },
        // https: true,
        // host:'0.0.0.0',
        port: 9000,
        proxy: {
            "https://juningsan.github.io/apidata": {    //需要代理的路径
                target: "https://api.steampowered.com",  //需要代理的域名
                pathRewrite: { '^/apidata': '/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json' },
                changeOrigin: true,  //必须配置为true，才能正确代理
            },
            "/apidata": {    //需要代理的路径
                target: "https://api.steampowered.com",  //需要代理的域名
                pathRewrite: { '^/apidata': '/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json' },
                changeOrigin: true,  //必须配置为true，才能正确代理
            },
            "/user": {
                target: "https://www.dtcj.com",
                pathRewrite: { '^/user': '/wechat/signature?test=1url=1' },
                changeOrigin: true
            },
            "/matchdata":{
                target: "https://api.steampowered.com",
                pathRewrite: { '^/matchdata': 'IDOTA2Match_570/GetMatchDetails/V001/?key=0C662E58BD243F9090C794507DFF4BE5&match_id=3525611894' },
                changeOrigin: true
            },
            "/heroslist":{
                target: "https://api.steampowered.com",
                pathRewrite: { '^/heroslist': 'IEconDOTA2_570/GetHeroes/v1?key=0C662E58BD243F9090C794507DFF4BE5' },
                changeOrigin: true
            },
            // "/matchdata1":{
            //     target: "https://api.steampowered.com",
            //     pathRewrite: { '^/matchdata1': 'IDOTA2Match_570/GetMatchDetails/V001/?key=0C662E58BD243F9090C794507DFF4BE5&match_id='+matchId },
            //     changeOrigin: true
            // }
        }
    }

}
console.log(process.env.NODE_ENV);