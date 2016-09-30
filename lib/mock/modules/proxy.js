
'use strict';

// const request = require('./koa_request');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var __root = fozy.__root;
var path = require('path');
var config = require(path.join(__root, 'fozy.config'));
var _request = require('request');
// const $proxy = require('http-proxy').createProxyServer({target: config.mock.proxy});

var proxy = function proxy(opt) {
    return function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
            var options, d;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            options = {
                                url: opt.url + ctx.url,
                                headers: ctx.header,
                                body: getParsedBody(ctx)
                            };
                            // console.log(ctx);
                            // try{
                            //     let res = await (request[ctx.method.toLowerCase()+'Async'])(options);
                            //     ctx.status = res.statusCode;
                            //     ctx.body = res.body;
                            //     for (var name in res.headers) {
                            //         if (name === 'transfer-encoding') {
                            //             continue;
                            //         }
                            //         ctx.set(name, res.headers[name]);
                            //     }
                            // }catch(err){
                            //     console.log('[KS] API proxy error', err);
                            // }

                            try {
                                // ctx.body = _request(opt.url + ctx.url);
                                // debugger;
                                d = ctx.res;

                                $proxy.web(ctx.req, ctx.res, function () {
                                    console.log(arguments);
                                });
                                $proxy.on('error', function (e) {
                                    console.log(e);
                                });
                                console.log(ctx.res);
                                console.log(d === ctx.res);
                            } catch (err) {
                                console.log(err);
                            }

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};

function getParsedBody(ctx) {
    var body = ctx.req.body;
    if (body === undefined || body === null) {
        return undefined;
    }
    var contentType = ctx.req.header['content-type'];
    if (!Buffer.isBuffer(body) && typeof body !== 'string') {
        if (contentType && contentType.indexOf('json') !== -1) {
            body = JSON.stringify(body);
        } else {
            body = body + '';
        }
    }
    return body;
}

module.exports = proxy;