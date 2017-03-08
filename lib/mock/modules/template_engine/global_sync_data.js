
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _local_data = require('../local_data');

var _local_data2 = _interopRequireDefault(_local_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __root = fozy.__root;
var config = require(_path2.default.join(__root, 'fozy.config'));
var globalJsonPath = _path2.default.join(__root, config.template.mock, '__global/data');

var GlobalSyncData = function () {
    function GlobalSyncData() {
        _classCallCheck(this, GlobalSyncData);
    }

    _createClass(GlobalSyncData, [{
        key: 'getData',
        value: function getData() {
            return new _local_data2.default({
                path: globalJsonPath
            }).getData();
        }
    }]);

    return GlobalSyncData;
}();

exports.default = GlobalSyncData;