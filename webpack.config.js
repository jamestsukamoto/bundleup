const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "style.css",
  //     chunkFilename: "[id].css"
  //   })
  // ],
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
          'style-loader',
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