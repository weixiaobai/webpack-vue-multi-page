'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const glob = require('glob')
const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const PAGE_PATH = path.resolve(__dirname, '../src/pages')
exports.entries = function() {
    var entryFiles = glob.sync(config.base.page_path + '/*/index.js')
    var map = {}
    map['index'] =  path.resolve(__dirname, '../src/index.js');
    entryFiles.forEach((filePath) => {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let parentPath = filePath.replace(/.*\/pages\//, '').replace(/\/.*/, '');
        //console.log("+++++++++--" + parentPath+"---------"+filePath);
        map[parentPath + '/' + filename] = filePath
    })
    return map
}
exports.htmlPlugin = function() {
    let entryHtml = glob.sync(config.base.page_path + '/*/*.html')
    let arr = []
    arr.push(new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',
        chunks: ['index'],
        inject: true
    }))
    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let parentPath = filePath.replace(/.*\/pages\//, '').replace(/\/.*/, '');
        //console.log("-------------------" + parentPath);
        let conf = {
            template: filePath,
            filename: parentPath + '/index.html',
            chunks: [parentPath + "/" + filename],
            inject: true
        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}