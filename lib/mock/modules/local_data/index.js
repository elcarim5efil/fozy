
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _require_from_new = require('../../../util/require_from_new');

var _require_from_new2 = _interopRequireDefault(_require_from_new);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        value: function getData(option) {
            var json = {};
            var filePath = this.path + this.postfix;
            var isDataFileExist = _extend2.default.isFileExist(filePath);

            if (isDataFileExist) {
                try {
                    json = (0, _require_from_new2.default)(filePath);
                } catch (err) {
                    console.info('[KS] data parse error, check file: ' + filePath);
                }
            }

            return json;
        }
    }]);

    return LocalData;
}();

exports.default = LocalData;