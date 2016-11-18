/**
 *
 */

import path from 'path';

import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import autoprefixer from 'autoprefixer';
import postcssFontGrabber from 'postcss-font-grabber';

import buildConfig from './build';
import networkConfig from './network';

export default {
  devtool: 'inline-source-map',
  
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    `webpack-dev-server/client?http://${networkConfig.devServer.host}:${networkConfig.devServer.port}`,
    'webpack/hot/only-dev-server',
    "./client.jsx",
  ],
  
  context: buildConfig.src.client.root,
  
  output: {
    publicPath  : buildConfig.build.client.pathPrefix,
    sourcePrefix: '  ',
    path        : buildConfig.build.client.dest.root,
    filename    : 'app.js',
  },
  
  cache: true,
  
  stats: {
    colors      : true,
    reasons     : true,
    hash        : false,
    version     : false,
    timings     : true,
    chunks      : false,
    chunkModules: false,
    cached      : false,
    cachedAssets: false,
  },
  
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },
  
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug  : true,
      postcss: () => {
        return [
          autoprefixer({
            browsers: [
              'Android >= 4',
              'Chrome >= 35',
              'Firefox >= 31',
              'Explorer >= 9',
              'iOS >= 7',
              'Opera >= 12',
              'Safari >= 7.1',
            ],
          }),
          postcssFontGrabber({
            dirPath: buildConfig.build.client.dest.font,
          }),
        ];
      },
    }),
    
    new webpack.DefinePlugin({
      '__DEV__'    : true,
      'process.env': {
        'NODE_ENV': '"development"',
        'BROWSER' : true,
      },
    }),
    
    new AssetsPlugin({
      prettyPrint  : true,
      path         : path.dirname(buildConfig.build.client.asset),
      filename     : path.basename(buildConfig.build.client.asset),
      processOutput: assets => `module.exports = ${JSON.stringify(assets)}`,
    }),
    
    new ExtractTextPlugin(path.basename(buildConfig.build.client.style)),
    
    new webpack.HotModuleReplacementPlugin(),
    
    new webpack.NoErrorsPlugin(),
  ],
  
  module: {
    rules: [
      {
        test   : /\.jsx?$/,
        include: [
          buildConfig.src.client.root,
        ],
        exclude: /node_modules/,
        use    : 'babel-loader',
      },
      {
        test  : /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use : 'url-loader?limit=4096&name=img/[hash].[ext]',
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        use : 'url-loader?limit=4096&name=font/[hash].[ext]',
      },
      {
        test: /\.(wav|mp3|ogg)$/,
        use : 'file-loader?name=audio/[hash].[ext]',
      },
      {
        test  : /\.css/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader        : [
            'css-loader?sourceMap',
            'postcss-loader',
          ],
        }),
      },
      {
        test  : /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader        : [
            'css-loader?sourceMap',
            'postcss-loader',
            'less-loader',
          ],
        }),
      },
      {
        test  : /\.scss/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader        : [
            'css-loader?sourceMap',
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
    ],
  },
  
};