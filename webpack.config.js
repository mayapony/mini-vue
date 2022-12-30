const path = require('path');

module.exports = {
  // use mode that can enable webpack's built-in optimization that correspond to each environment
  mode: 'development',
  // devtool: false,
  devtool: 'inline-cheap-source-map',
  entry: './src/index.js',
  output: {
    filename: 'mini-vue.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'src/examples'),
      },
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/dist',
      },
    ],
    port: 9000,
  },
};
