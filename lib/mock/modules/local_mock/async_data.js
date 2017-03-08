
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _jsonProcessor = require('../../../util/json.processor.js');

var _jsonProcessor2 = _interopRequireDefault(_jsonProcessor);

var _local_data = require('../local_data');

var _local_data2 = _interopRequireDefault(_local_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __root = fozy.__root;
var config = require(_path2.default.join(__root, 'fozy.config'));

var AsyncData = function () {
    function AsyncData(ctx) {
        _classCallCheck(this, AsyncData);

        this.files = {};
        this.ctx = ctx;
        this.data = {};
    }

    _createClass(AsyncData, [{
        key: 'getData',
        value: function getData() {
            var files = this.files = this.getFiles(this.ctx);

            var data = this.data = new _local_data2.default({
                path: files.json
            }).getData();

            return this.processData(data);
        }
    }, {
        key: 'processData',
        value: function processData(data) {
            var ctx = this.ctx;
            var proc = new _jsonProcessor2.default({
                module: this.files.js + '.js',
                preStringify: false
            });

            return proc.process(data || {}, ctx.request.body, _querystring2.default.parse(ctx.url.split('?')[1]), ctx);
        }
    }, {
        key: 'getFiles',
        value: function getFiles(ctx) {
            var files = {};
            var url = _extend2.default.removePostfix(ctx.url.split('?')[0]);
            var method = ctx.method.toLocaleLowerCase();
            var root = _path2.default.join(__root, config.mock.api.root, method && config.mock.api[method]);
            var fileName = config.mock.fileName;
            if (!fileName) {
                files.json = _path2.default.join(root, url);
                files.js = _path2.default.join(root, url);
            } else {
                files.json = _path2.default.join(root, url, fileName);
                files.js = _path2.default.join(root, url, fileName);
            }
            return files;
        }
    }]);

    return AsyncData;
}();

exports.default = AsyncData;