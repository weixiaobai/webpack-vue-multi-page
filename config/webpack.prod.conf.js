const path = require('path');
const glob = require('glob');
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const merge = require('webpack-merge')
const webpack = require('webpack')
const PurifyCSSPlugin = require("purifycss-webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')

//打包配置文件
const webpackConfig = merge(baseWebpackConfig, {
})

const spinner = ora('正为生产环境打包.....')
spinner.start()
//清空config.build.assetsRoot 目录,执行webpack打包
rm(config.build.assetsRoot, err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})