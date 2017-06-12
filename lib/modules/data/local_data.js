
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _require_from_new = require('../../util/require_from_new');

var _require_from_new2 = _interopRequireDefault(_require_from_new);

var _fs = require('../../promise/fs.js');

var _fs2 = _interopRequireDefault(_fs);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalData = function () {
    function LocalData(option) {
        _classCallCheck(this, LocalData);

        this.path = option.path;
        this.postfix = option.postfix || '.json';
        this.body = option.body || {};
        this.queryStr = option.queryStr || {};
    }

    _createClass(LocalData, [{
        key: 'getData',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(option) {
                var json, jsonPath, json5Path, isJsonFileExist, isJson5FileExist, path, file;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                json = {};
                                jsonPath = this.path + this.postfix;
                                json5Path = this.path + '.json5';
                                isJsonFileExist = _extend2.default.isFileExist(jsonPath);
                                isJson5FileExist = _extend2.default.isFileExist(json5Path);
                                path = null;

                                if (isJson5FileExist) {
                                    path = json5Path;
                                } else if (isJsonFileExist) {
                                    path = jsonPath;
                                }

                                if (!path) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.prev = 8;
                                _context.next = 11;
                                return _fs2.default.readFileAsync(path, 'utf-8');

                            case 11:
                                file = _context.sent;
                                return _context.abrupt('return', json = _json2.default.parse(file));

                            case 15:
                                _context.prev = 15;
                                _context.t0 = _context['catch'](8);

                                console.info('[KS] data parse error, check file: ' + jsonPath);

                            case 18:
                                return _context.abrupt('return', json);

                            case 19:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[8, 15]]);
            }));

            function getData(_x) {
                return _ref.apply(this, arguments);
            }

            return getData;
        }()
    }]);

    return LocalData;
}();

exports.default = LocalData;