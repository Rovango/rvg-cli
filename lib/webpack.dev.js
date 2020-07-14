const { merge } = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'developemnt',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './dist',
    // publicPath: 'http://localhost:8000/dist/',
    // port: 8000,
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
