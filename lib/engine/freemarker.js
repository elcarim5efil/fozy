
'use strict';

var _freemarker = require('freemarker.js');

var _freemarker2 = _interopRequireDefault(_freemarker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (option) {
    var fm = new _freemarker2.default(option);
    return {
        engine: fm,
        render: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(tpl, json) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', new Promise(function (resolve, reject) {
                                    fm.render(tpl, json, function (err, html, output) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            resolve(html);
                                        }
                                    });
                                }));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function render(_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }()
    };
};