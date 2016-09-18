
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var __root = fozy.__root;
var config = require(path.join(__root, 'fozy.config'));

var mock = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var p, data, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        p = path.join(__root, config.mock.api, ctx.method.toLowerCase(), ctx.url, 'data.json');
                        _context.prev = 1;
                        _context.next = 4;
                        return fs.readFileAsync(p);

                    case 4:
                        data = _context.sent;
                        json = JSON.parse(data);

                        ctx.body = json;
                        ctx.type = 'json';
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](1);
                        return _context.abrupt('return', next());

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 10]]);
    }));

    return function mock(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = mock;