const path = require('path');
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('./utils')
const config = require('./config')

module.exports = {
    //入口文件的配置项
    entry: utils.entries(),
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: config.base.assetsRoot,
        publicPath:'/',
        //输出的文件名称
        filename: '[name].js?v=[hash:5]'
        //publicPath:website.publicPath
    },
    // 其他解决方案
    resolve: {
        // require时省略的扩展名，遇到.vue结尾的也要去加载
        extensions: ['.js', '.vue', '.json'],
        // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            // 增加的内容开始XDFFE
            'pages': path.resolve(__dirname, '../src/pages'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },

    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [
            //  使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    //extractCSS: true
                }
            }, {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        //env es6处理
                        presets: ['env']
                    }
                }]
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            }, {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500,
                        //outputPath: '/static/[name].[ext]?v=[hash:5]'
                        name:'static/img/[name].[ext]?v=[hash:5]'
                    }
                }]
            }, {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins: [
        new uglify(),
        new ExtractTextPlugin({
            filename: '[name].css?v=[hash:5]'
        }),
        //new ExtractTextPlugin("style.css"),
        //new PurifyCSSPlugin({
        //    // Give paths to parse for rules. These should be absolute!
        //    paths: glob.sync(path.join(__dirname, 'src/*.html')),
        //}),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }]),
        new VueLoaderPlugin()
    ].concat(utils.htmlPlugin())
}