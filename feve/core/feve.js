/**
 * Feve
 *
 * @license        Apache 2.0
 * @copyright  (c) 2016, AaronJan
 * @author         AaronJan <https://github.com/AaronJan/feve>
 */

import path from 'path';
import judge from '../utils/judge';

const scriptDir = path.join(__dirname, '..', 'commands');

/**
 * @param scriptName
 */
export function invokeScript (scriptName) {
  const scriptPath = path.join(scriptDir, scriptName);
  const task       = require(scriptPath).default;

  judge(task);
}