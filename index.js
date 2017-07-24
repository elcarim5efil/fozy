

require('babel-polyfill');

const app = require('./lib/app');
const path = require('path');

const config = require(path.join(fozy.__root, 'fozy.config')),
  __root = fozy.__root;

let listener,
  MAX_RETRY = config.maxRetry || 10,
  port = config.port || 3000,
  watch = false;

process.on('uncaughtException', (err) => {
  if (err.code === 'EADDRINUSE') {
    if (--MAX_RETRY > 0) {
      console.log('[KS] Port %d is in used, trying port %d', port, ++port);
      doListen();
    } else {
      console.log('[KS] Retry to much time(%d)', MAX_RETRY);
    }
  } else {
    console.log('[KS] Undandle error', err);
  }
});

function doListen() {
  return listener = app.listen(port, () => {
    console.log('[KS] Koa server is listening to port %d', listener.address().port);
  });
}

const entry = {
  run(options) {
    if (!listener) {
      watch = options.watch;
      return doListen();
    }
    return listener;
  },
};

module.exports = entry;
