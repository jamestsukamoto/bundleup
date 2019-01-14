const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
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