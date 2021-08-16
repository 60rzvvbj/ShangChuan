const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: { // 配置路径别名
        '@': resolve('src'),
        'assets': resolve('src/assets'),
        'common': resolve('src/common'),
        'components': resolve('src/components'),
        'network': resolve('src/network'),
        'plugins': resolve('src/plugins'),
        'views': resolve('src/views'),
      }
    }
  },
  devServer: {
    proxy: { // 反向代理
      'api/': {
        target: 'http://localhost:1523',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        }
      },
      'server/': {
        target: 'http://121.4.135.163:8001/api',
        changeOrigin: true,
        pathRewrite: {
          '^/server': '',
        }
      },
    }
  }
}
