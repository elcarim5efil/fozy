
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('../promise/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __root = fozy.__root;
var config = fozy.__config;

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'getRouter',
        value: function getRouter() {
            var _this = this;

            return function () {
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
                    }, _callee, _this, [[1, 9]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();
        }
    }]);

    return _class;
}();

exports.default = _class;