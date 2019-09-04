const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const webpack = require('webpack')

module.exports = (env, argv) => {

  let plugins = [
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: './index.html'
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new CopyWebpackPlugin([
      { from: 'config' }
    ]),
    new webpack.ProvidePlugin({
      "React": "react",
    })
  ]

  // if (argv.mode === 'production') {
  //   plugins.push(new CompressionPlugin({
  //     compressionOptions: {
  //       numiterations: 15,
  //     },
  //     algorithm(input, compressionOptions, callback) {
  //       return zopfli.gzip(input, compressionOptions, callback);
  //     },
  //   }))
  // }

  return {
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'lib'),
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [require('@babel/plugin-proposal-object-rest-spread')]
            }
          }
        },
        {
          test: /\.(pdf|jpg|png|gif|ico)$/,
          use: [{ loader: 'file-loader' }]
        },
        {
          test: /\.svg$/,
          use: [{ loader: 'svg-inline-loader' }]
        },
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            // {
            //   loader: MiniCssExtractPlugin.loader
            // },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('autoprefixer')({
                  browsers: ['> 1%', 'last 2 versions']
                })]
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      open: true,
      port: 9001,
      host: '0.0.0.0'
    },
    plugins: plugins
  }
}
