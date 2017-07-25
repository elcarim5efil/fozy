

require('babel-polyfill');

const app = require('./lib/app');
const path = require('path');

const configPath = path.join(fozy.root, 'fozy.config');
/* eslint-disable */
const config = require(configPath);
/* eslint-enable */

const MAX_RETRY = config.maxRetry || 10;

let listener;
let port = config.port || 3000;
let maxRetry = MAX_RETRY;

function doListen() {
  listener = app.listen(port, () => {
    console.info('[KS] Koa server is listening to port %d', listener.address().port);
  });
  return listener;
}

process.on('uncaughtException', (err) => {
  if (err.code === 'EADDRINUSE') {
    maxRetry -= 1;
    if (maxRetry > 0) {
      port += 1;
      console.info('[KS] Port %d is in used, trying port %d', port - 1, port);
      doListen();
    } else {
      console.info('[KS] Retry to much time(%d)', maxRetry);
    }
  } else {
    console.info('[KS] Undandle error', err);
  }
});

/* eslint-disable */
var watch = false;
/* eslint-enable */

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
