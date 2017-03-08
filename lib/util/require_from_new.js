
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = requireWithNoCache;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requireWithNoCache(file) {
    delete require.cache[_path2.default.resolve(file)];
    return require(file);
}