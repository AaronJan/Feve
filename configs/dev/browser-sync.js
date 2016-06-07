/**
 * 
 */

import networkConfig from './network';

export default {
  initConfig: {
    port  : networkConfig.browserSync.port.main,
    notify: true,
    ui    : {
      port: networkConfig.browserSync.port.ui,
    },
    proxy : {
      target: (networkConfig.devServer.host + ':' + networkConfig.devServer.port),
    },
    ghostMode: false,
  },
};