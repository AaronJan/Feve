/**
 * Feve
 *
 * @license        Apache 2.0
 * @copyright  (c) 2016, AaronJan
 * @author         AaronJan <https://github.com/AaronJan/feve>
 */

import fs from 'fs';
import template from 'lodash/template';

/**
 * @param templatePath
 * @param renderData
 */
function renderTemplate (templatePath, renderData) {
  const templateCompiler = template(fs.readFileSync(templatePath));

  return templateCompiler(renderData);
}

/**
 * @param templatePath
 * @param destPath
 * @param entryConfig
 * @param assetPath
 */
function makeEntry (templatePath, destPath, entryConfig, assetPath) {
  const assetConfig = require(assetPath);

  let renderData = {
    title      : entryConfig.title,
    description: entryConfig.description,
    styleUrl   : assetConfig.main.css,
    scriptUrl  : assetConfig.main.js,
  };

  const html = renderTemplate(templatePath, renderData);

  fs.writeFileSync(destPath, html);
}

export default makeEntry;