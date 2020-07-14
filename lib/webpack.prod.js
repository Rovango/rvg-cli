const { merge } = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const Cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: Cssnano,
    }),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'dist/react',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'dist/react-dom',
    //       global: 'ReactDOM',
    //     },
    //   ]
    // }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          // test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
