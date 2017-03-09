
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaBrowserSync = require('koa-browser-sync');

var _koaBrowserSync2 = _interopRequireDefault(_koaBrowserSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __root = fozy.__root;
var config = fozy.__config;

var files2Watch = [];
files2Watch.push(_path2.default.join(__root, config.template.root || ''));
files2Watch = files2Watch.concat(config.watch.map(function (item) {
    return _path2.default.join(__root, item);
}));

module.exports = (0, _koaBrowserSync2.default)({
    init: true,
    files: files2Watch,
    notify: false,
    ui: false,
    online: false,
    open: config.autoOpen
});