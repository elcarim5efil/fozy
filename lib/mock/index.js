
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = require('../../lib/promise/fs');
var path = require('path');
var __root = fozy.__root;
var config = require(path.join(__root, 'fozy.config'));
var router = require('koa-router')();

var apiMock = require('./modules/api_mock.js');
var templateEngine = require('./modules/template_engine');

// template mock
router.get('*', templateEngine({ engine: 'ftl' }));

router.get('*', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var p, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        p = path.join(__root, config.htmlView || 'views', ctx.url + '.html');
                        _context.prev = 1;
                        _context.next = 4;
                        return fs.readFileAsync(p);

                    case 4:
                        data = _context.sent;

                        ctx.type = 'html';
                        ctx.body = data;
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](1);
                        return _context.abrupt('return', next());

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 9]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

router.all('*', apiMock);

module.exports = router;