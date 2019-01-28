const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundleup.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  plugins: [
    new Dotenv({
      path: './.env'
    })
  ],
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          {
            loader: require.resolve('style-loader'),
            options: {
              singleton: true
            }
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"  
            },
          }
        ],
        include: __dirname + '/client/src/components'
      }, { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, { 
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ]
  }
};