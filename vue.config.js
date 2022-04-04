const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  outputDir: 'build',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['.js', '.vue', '.json']
    }
  },
  devServer: {
    proxy: 'https://localhost:7129',
    port: 7129
  }
};
