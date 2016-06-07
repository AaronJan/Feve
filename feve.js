/**
 * Feve
 *
 * @license        Apache 2.0
 * @copyright  (c) 2016, AaronJan
 * @author         AaronJan <https://github.com/AaronJan/feve>
 */

import { invokeScript } from './feve/core/feve';

/**
 * @param filename
 * @returns {boolean}
 */
function isMainModuleFile (filename) {
  return process.mainModule.filename === filename;
}

/**
 * @param expect
 * @returns {boolean}
 */
function isProcessArgumentNumMoreThan (expect) {
  return process.argv.length > expect;
}

/**
 *
 */
if (isMainModuleFile(__filename) && isProcessArgumentNumMoreThan(2)) {
  try {
    invokeScript(process.argv[2]);
  } catch (err) {
    console.error(err.stack);
  }
} else {
  throw new Error('This script can only be running in CLI');
}