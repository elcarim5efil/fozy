const path = require('path');

module.exports = function requireWithNoCache(file) {
  delete require.cache[path.resolve(file)];
  /*eslint-disable*/
  return require(file);
  /*eslint-enable*/
}
