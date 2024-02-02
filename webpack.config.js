const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    modules: ['node_modules', path.join(__dirname, './src')],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@operations': path.resolve(__dirname, 'src/Services/Solver/Operations'),
      '@stringMethods': path.resolve(__dirname, 'src/View/StringMethods'),
      '@handlers': path.resolve(__dirname, 'src/View/handlers'),
      '@services': path.resolve(__dirname, 'src/Services'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
  },
  mode: 'development',
  target: 'web',
  stats: {
    errorDetails: true,
  }
}