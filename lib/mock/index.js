
'use strict';

var _fs = require('../../lib/promise/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api_mock = require('./modules/api_mock.js');

var _api_mock2 = _interopRequireDefault(_api_mock);

var _template_engine = require('./modules/template_engine');

var _template_engine2 = _interopRequireDefault(_template_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var __root = fozy.__root;
var config = require(_path2.default.join(__root, 'fozy.config'));
var router = require('koa-router')();

// template mock
router.get('*', (0, _template_engine2.default)({ engine: 'ftl' }));

router.get('*', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var p, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        p = _path2.default.join(__root, config.htmlView || 'views', ctx.url + '.html');
                        _context.prev = 1;
                        _context.next = 4;
                        return _fs2.default.readFileAsync(p);

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

router.all('*', _api_mock2.default);

module.exports = router;