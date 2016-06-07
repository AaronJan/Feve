/**
 *
 */

import networkConfig from './network';
import buildConfig from './build';

export default {
  host      : networkConfig.devServer.host,
  port      : networkConfig.devServer.port,
  webpackDev: {
    contentBase       : buildConfig.build.client.public,
    publicPath        : buildConfig.build.client.pathPrefix,
    noInfo            : false,
    hot               : true,
    historyApiFallback: false,
    watchOptions      : {
      aggregateTimeout: 300,
      poll            : 1000,
    },
    stats             : {
      colors: true,
    },
  },
};
