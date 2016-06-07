/**
 * Feve
 *
 * @license        Apache 2.0
 * @copyright  (c) 2016, AaronJan
 * @author         AaronJan <https://github.com/AaronJan/feve>
 */

import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import BrowserSync from 'browser-sync';
import once from 'lodash/fp/once';

import clean from '../utils/clean';
import copy from '../utils/copy';
import judge from '../utils/judge';
import makeEntry from '../utils/make-entry';
import structuring from '../utils/structuring';

import browserSyncConfig from '../../configs/dev/browser-sync';
import buildConfig from '../../configs/dev/build';
import networkConfig from '../../configs/dev/network';
import devServerConfig from '../../configs/dev/dev-server';
import webpackConfig from '../../configs/dev/webpack';
import entryConfig from '../../configs/dev/entry';

const compiler = webpack(webpackConfig);
const bs       = BrowserSync.create();

/**
 * @returns {Promise}
 */
function startDevServer () {
  return new Promise((resolve, reject) => {
    compiler.plugin("done", once(stats => {
      console.log('Webpack finished compiling.');
      resolve();
    }));

    /**
     * @param err
     * @param result
     */
    const onStarted = (err, result) => {
      if (err) {
        reject(err);
      }

      console.log(`Listening at http://${networkConfig.devServer.host}:${networkConfig.devServer.port}/`);
      console.log('Waiting for Webpck to finish compiling...');
    };

    const server = new WebpackDevServer(compiler, devServerConfig.webpackDev);

    server.use(webpackHotMiddleware(compiler));
    server.listen(networkConfig.devServer.port, networkConfig.devServer.host, onStarted);
  });
}

/**
 *
 * @returns {Promise}
 */
function startBrowserSync () {
  return new Promise(resolve => {
    bs.init(browserSyncConfig.initConfig, () => {
      resolve();
    });
  });
}


async function start () {
  try {
    await judge(clean, [
      [
        path.join(buildConfig.build.client.public, '*'),
      ],
    ]);

    await judge(structuring, [
      [
        buildConfig.build.client.dest.root,
        buildConfig.build.client.dest.image,
        buildConfig.build.client.dest.font,
      ],
    ]);

    await judge(copy, [
      buildConfig.src.client.public,
      buildConfig.build.client.public,
    ]);

    await judge(startDevServer);

    await judge(makeEntry, [
      buildConfig.src.client.entry,
      buildConfig.build.client.entry,
      entryConfig,
      buildConfig.build.client.asset,
    ]);

    await judge(startBrowserSync);

    compiler.plugin("done", function (stats) {
      bs.reload('*.css');
    });

  } catch (err) {
    console.error(err.stack);
  }
}

export default start;