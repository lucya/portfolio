const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const isDev = process.env.NODE_ENV !== 'production'
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config.module.rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader').loader('file-loader')
  },
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: isDev ? true : false
      }
    }
  },
  outputDir: path.resolve(__dirname, './dist'),
})