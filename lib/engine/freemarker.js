
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Freemarker = require('freemarker.js');

module.exports = function (option) {
    var fm = new Freemarker(option);
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