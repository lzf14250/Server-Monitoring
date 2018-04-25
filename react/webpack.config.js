var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use:[
            {
              loader: "babel-loader",
              options:{
                presets:['react']
              }
            }
          ],
        },{
          test: /\.css$/,
          use:['style-loader','css-loader'],
        },{
          test: /\.svg$/,
          exclude: /node_modules/,
          use:'svg-loader',
        }
      ]
    }
}
