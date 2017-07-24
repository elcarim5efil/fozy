import StreamInjecter from 'stream-injecter';

const browserSync = require('browser-sync').create();

let bs = null;

const createBrowserSync = function createBrowserSync(opts) {
  return new Promise((resolve, reject) => browserSync.init(opts, (err, instance) => {
    if (err) {
      return reject(err);
    }
    bs = instance;
    return resolve(bs.getOption('snippet'));
  }));
};

module.exports = (_opts) => {
  const opts = _opts || {};
  opts.init = _opts.init || false;
  opts.debugInfo = _opts.debugInfo || false;

  return (ctx, next) => next()
    .then(() => {
      if (opts.init) {
        if (!bs) {
          return createBrowserSync(opts);
        }
        return bs.getOption('snippet');
      }
      return process.env.BROWSERSYNC_SNIPPET;
    })
    .then((snippet) => {
      if (!snippet
                || (!(ctx.response.type && ~ctx.response.type.indexOf('text/html')))
      ) {
        return;
      }

      // Buffer
      if (Buffer.isBuffer(ctx.body)) {
        ctx.body = ctx.body.toString();
      }

      // String
      if (typeof ctx.body === 'string') {
        if (ctx.body.match(/client\/browser-sync-client/)) {
          return;
        }
        ctx.body = ctx.body.replace(/<\/body>/, `${snippet}</body>`);
      }

      // Stream
      if (ctx.body && typeof ctx.body.pipe === 'function') {
        const injecter = new StreamInjecter({
          matchRegExp: /(<\/body>)/,
          inject: snippet,
          replace: `${snippet}$1`,
          ignore: /client\/browser-sync-client/,
        });
        const size = +ctx.response.header['content-length'];

        if (size) {
          ctx.set('Content-Length', size + Buffer.byteLength(snippet));
        }

        ctx.body = ctx.body.pipe(injecter);
      }
    });
};
