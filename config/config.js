'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/test': {
        target: 'http://localhost',
        changeOrigin: true,
        pathRewrite: {
          '^/test': '/'
        }
      }
    },
    // Various Dev Server settings
    host: 'localhost',
    port: 7002,
  },

  build: {
    assetsRoot: path.resolve(__dirname, '../wwwroot/'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
  },
  base:{
    assetsRoot: path.resolve(__dirname, '../wwwroot/'),
    page_path:path.resolve(__dirname, '../src/pages')
  }
}
