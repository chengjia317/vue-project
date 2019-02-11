const baseUrl = '/'

module.exports = {
  baseUrl: baseUrl,
  lintOnSave: true,
  devServer: {
    host: 'shavedog-m.1programmer.com',
    port: 80,
    publicPath: baseUrl,
    proxy: {
      '/api': {
        target: 'http://shavedog-api.1programmer.com:80/',
        changeOrigin: true,
        pathRewrite: {
          ' ^/api ': '/api'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 100,
            propList: ['*'],
          }),
          require('autoprefixer')({
            browsers: ['Android >= 4.0', 'iOS >= 7']
          }),
        ]
      }
    }
  },
}
