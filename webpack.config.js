const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const fs = require('fs')


const arrToObj = (arr, setKey, setValue) => (
  arr.reduce((acc, filename) => Object.assign(acc, { [setKey(filename)]: setValue(filename) }), {})
)

const dirs = fs.readdirSync(path.resolve(__dirname, './src'))

const filesJs = dirs.filter(file => path.parse(file).ext === '.js')

//path.basename

const entrys = arrToObj(
  filesJs,
  filename => path.basename(filename, '.bs.js'),
  filename => `./src/${filename}`
)

const common = {
  entry: entrys,
  context: __dirname,
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: '[name].js',
    library: '[name]',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, './src'),
        options: {
          context: path.resolve(__dirname, './src'),
          name: '[path][name].[ext]',
        },
      },

    ]
  },
}

const dev = {
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/',
    compress: true,
    watchContentBase: true,
    host: '0.0.0.0',
    port: 9000,
    historyApiFallback: {
      from: '/',
      to: 'main/index.html'
    }
  }
}

const prod = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJsPlugin(),
  ],
}


module.exports = (env) => merge(common, ({
  'production': prod
}[env && env.NODE_ENV]) || dev)