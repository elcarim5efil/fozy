
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var request = require('./koa_request');

var proxy = function proxy(opt) {
    return function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
            var options, res, name;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            options = {
                                url: opt.url + ctx.url,
                                headers: ctx.header,
                                body: getParsedBody(ctx)
                            };
                            _context.next = 3;
                            return request[ctx.method.toLowerCase() + 'Async'](options);

                        case 3:
                            res = _context.sent;

                            ctx.status = res.statusCode;
                            ctx.body = res.body;
                            _context.t0 = regeneratorRuntime.keys(res.headers);

                        case 7:
                            if ((_context.t1 = _context.t0()).done) {
                                _context.next = 14;
                                break;
                            }

                            name = _context.t1.value;

                            if (!(name === 'transfer-encoding')) {
                                _context.next = 11;
                                break;
                            }

                            return _context.abrupt('continue', 7);

                        case 11:
                            ctx.set(name, res.headers[name]);
                            _context.next = 7;
                            break;

                        case 14:
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