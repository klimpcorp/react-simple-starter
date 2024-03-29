const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin/dist/clean-webpack-plugin');
const WebpackManifest = require('webpack-manifest-plugin');
const Visualizer = require('webpack-visualizer-plugin');


module.exports = {
  entry: path.resolve(__dirname, '../src/index.jsx'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      Assets: path.resolve(__dirname, '../src/assets'),
      Containers: path.resolve(__dirname, '../src/containers'),
      Components: path.resolve(__dirname, '../src/components'),
      BaseComponents: path.resolve(__dirname, '../src/components/base'),
    },
  },

  optimization: {
    runtimeChunk: 'single', //extract all webpack runtime logic to a single bundle
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, //extract all node_modules required staff to a separate bundle
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
              fix: true,
              formatter: require('eslint/lib/formatters/table'),
              cache: true,
            },
          },
          'stylelint-custom-processor-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '../src'),
        use: ['thread-loader', 'cache-loader', 'babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'React Simple Starter',
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      PropTypes: 'prop-types',
    }),
    new WebpackManifest(),
    new Visualizer(),
  ]
};


