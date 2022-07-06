const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    home: {
      import: './src/app/home/home.ts'
    },
    error: {
      import: './src/app/404/404.ts'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      title: 'Swierkosz',
      template: './src/app/home/home.html',
      'meta': {
        'viewport': 'width=device-width, initial-scale=1',
        'description': 'Anthony Swierkosz\'s website highlighting personal projects, experiences, and contact information.',
      }
    }),
    new HtmlWebpackPlugin({
      title: '404',
      template: './src/app/404/404.html',
      filename: '404.html',
      'meta': {
        'viewport': 'width=device-width, initial-scale=1',
        'description': 'Anthony Swierkosz\'s website highlighting personal projects, experiences, and contact information.',
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}