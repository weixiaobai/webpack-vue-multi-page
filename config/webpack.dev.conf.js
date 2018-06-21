const path = require('path');
const glob = require('glob');
var merge = require('webpack-merge')
var webpack = require('webpack')
const PurifyCSSPlugin = require("purifycss-webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const config = require('./config')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf.js')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const devWebpackConfig = merge(baseWebpackConfig, {
  devServer: {
    clientLogLevel: 'warning',
    overlay: { warnings: false, errors: true },
    //设置基本目录结构
    //contentBase: path.resolve(__dirname, '../dist'),
    contentBase: false,
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: HOST || config.dev.host,
    //服务端压缩是否开启
    compress: true,
    quiet: true, // necessary for FriendlyErrorsPlugin
    proxy: config.dev.proxyTable,
    //配置服务端口号
    port: PORT || config.dev.port
  }
})


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() :
          undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})