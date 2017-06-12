import StreamInjecter from 'stream-injecter';
var browserSync = require("browser-sync").create();

module.exports = (opts) => {

    var bs, snippet;
    var opts       = opts || {};
    opts.init      = opts.init || false;
    opts.debugInfo = opts.debugInfo || false;

    return function(ctx, next) {
        return next().then(function() {
            if(opts.init) {
                if (!bs) {
                    return new Promise(function(resolve, reject) {
                        return browserSync.init(opts, function (err, instance) {
                            if (err) {
                                return reject(err);
                            }
                            bs = instance;
                            return resolve(bs.getOption('snippet'));
                        });
                    });
                }
                return bs.getOption('snippet');
            }
            return process.env.BROWSERSYNC_SNIPPET;
        }).then(function(snippet) {

            if(!snippet
                || (!(ctx.response.type && ~ctx.response.type.indexOf("text/html")))
            ) {
                return;
            }

            // Buffer
            if(Buffer.isBuffer(ctx.body)) {
                ctx.body = ctx.body.toString();
            }

            // String
            if(typeof ctx.body === 'string') {
                if (ctx.body.match(/client\/browser-sync-client/)) {
                    return;
                }
                ctx.body = ctx.body.replace(/<\/body>/, snippet + '</body>');
            }

            // Stream
            if(ctx.body && typeof ctx.body.pipe === 'function') {
                var injecter = new StreamInjecter({
                    matchRegExp: /(<\/body>)/,
                    inject: snippet,
                    replace: snippet + '$1',
                    ignore: /client\/browser-sync-client/
                });
                var size = +ctx.response.header['content-length'];

                if(size) {
                    ctx.set('Content-Length', size + Buffer.byteLength(snippet));
                }

                ctx.body = ctx.body.pipe(injecter);
            }
        });
    };
};
