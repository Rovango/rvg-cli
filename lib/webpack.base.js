const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrosWebpackPlugin = require('friendly-errors-webpack-plugin');

const projectRoot = process.cwd();

const getMPAs = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  entryFiles.forEach((ef) => {
    const pageNameReg = /src\/(.*)\/index\.jsx?/;
    let pageName = ef.match(pageNameReg);
    // 获取entry的pageName
    pageName = pageName && pageName[1];

    if (pageName) {
      entry[pageName] = ef;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(projectRoot, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['commons', pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        })
      );
    }
  });

  return { entry, htmlWebpackPlugins };
};

const { entry, htmlWebpackPlugins } = getMPAs();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                Autoprefixer,
                // require('autoprefixer')
                // require('autoprefixer')({
                //   browsers: ['last 2 version', '>1%', 'ios 7']
                // })
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecisition: 8,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // use: 'file-loader'
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              limit: 10240,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contentHash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrosWebpackPlugin(),
    function doneWebpackPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--watch') === -1
        ) {
          // eslint-disable-next-line no-console
          console.log('build error');
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
