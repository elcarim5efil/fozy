
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _jsonProcessor = require('../../util/json.processor.js');

var _jsonProcessor2 = _interopRequireDefault(_jsonProcessor);

var _local_data = require('./local_data');

var _local_data2 = _interopRequireDefault(_local_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __root = fozy.__root;
var config = fozy.__config;

var AsyncData = function () {
    function AsyncData(ctx) {
        _classCallCheck(this, AsyncData);

        this.ctx = ctx;
        this.filePath = this.getFilePath(ctx) || '';
        this.data = {};
    }

    _createClass(AsyncData, [{
        key: 'getData',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return new _local_data2.default({
                                    path: this.filePath
                                }).getData();

                            case 2:
                                this.data = _context.sent;
                                return _context.abrupt('return', this.processData(this.data, this.ctx));

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getData() {
                return _ref.apply(this, arguments);
            }

            return getData;
        }()
    }, {
        key: 'processData',
        value: function processData(data, ctx) {
            var proc = new _jsonProcessor2.default({
                module: this.filePath + '.js',
                preStringify: false
            });

            return proc.process(data || {}, ctx.request.body, _querystring2.default.parse(ctx.url.split('?')[1]), ctx);
        }
    }, {
        key: 'getFilePath',
        value: function getFilePath(ctx) {
            var url = _extend2.default.removePostfix(ctx.url.split('?')[0]);
            var method = ctx.method.toLocaleLowerCase();
            var root = _path2.default.join(__root, config.mock.api.root, method && config.mock.api[method]);
            var fileName = config.mock.fileName || '';
            return _path2.default.join(root, url, fileName);
        }
    }]);

    return AsyncData;
}();

exports.default = AsyncData;