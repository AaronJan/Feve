/**
 * Feve
 *
 * @license        Apache 2.0
 * @copyright  (c) 2016, AaronJan
 * @author         AaronJan <https://github.com/AaronJan/feve>
 */

import path from 'path';
import webpack from 'webpack';

import clean from '../utils/clean';
import copy from '../utils/copy';
import judge from '../utils/judge';
import makeEntry from '../utils/make-entry';
import structuring from '../utils/structuring';

import buildConfig from '../../configs/prod/build';
import webpackConfig from '../../configs/prod/webpack';
import entryConfig from '../../configs/prod/entry';

/**
 *
 */
function bundle () {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig.stats));

      return resolve();
    });
  });
}


async function build () {
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

    await judge(bundle);

    await judge(makeEntry, [
      buildConfig.src.client.entry,
      buildConfig.build.client.entry,
      entryConfig,
      buildConfig.build.client.asset,
    ]);

  } catch (err) {
    console.error(err.stack);
  }
}

export default build;
