
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _data = require('../../data');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = fozy.__config;

var LocalMock = function () {
    function LocalMock() {
        _classCallCheck(this, LocalMock);
    }

    _createClass(LocalMock, [{
        key: 'getMocker',
        value: function getMocker() {
            var _this = this;

            var mock = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
                    var data;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return new _data.AsyncData(ctx).getData();

                                case 3:
                                    data = _context.sent;

                                    if (_this.isEmptyData(data)) {
                                        data = config.mock.api.defaultData;
                                    }
                                    ctx.body = data;
                                    ctx.type = 'json';
                                    _context.next = 12;
                                    break;

                                case 9:
                                    _context.prev = 9;
                                    _context.t0 = _context['catch'](0);
                                    return _context.abrupt('return', next());

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 9]]);
                }));

                return function mock(_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();
            return mock;
        }
    }, {
        key: 'isEmptyData',
        value: function isEmptyData(obj) {
            return Object.keys(obj).length === 0;
        }
    }]);

    return LocalMock;
}();

exports.default = LocalMock;