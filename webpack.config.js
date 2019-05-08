const path = require('path');

module.exports = {  
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'qps-utils.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'qpsUtils',    
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|test)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [            
              require("@babel/plugin-proposal-object-rest-spread"),
            ]
          }
        }
      }
    ]
  }
};