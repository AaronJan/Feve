/**
 * Feve
 *
 * @license        Apache 2.0
 * @copyright  (c) 2016, AaronJan
 * @author         AaronJan <https://github.com/AaronJan/feve>
 */

import ncp from 'ncp';

/**
 * @param src
 * @param dist
 */
export default function copy (src, dist) {
  return new Promise((resolve, reject) => {
    ncp(src, dist, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}
