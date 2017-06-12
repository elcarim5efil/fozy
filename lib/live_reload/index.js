
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _browserSync = require('./browser.sync.js');

var _browserSync2 = _interopRequireDefault(_browserSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __root = fozy.__root;
var config = fozy.__config;

var files2Watch = [];
files2Watch.push(_path2.default.join(__root, config.template.root || ''));
files2Watch = files2Watch.concat(config.watch.map(function (item) {
    return _path2.default.join(__root, item);
}));

var browserSyncOption = {
    init: true,
    watchOptions: {
        ignored: config.ignoredWatch || ''
    },
    files: files2Watch,
    notify: config.notify || false,
    ui: false,
    online: false,
    logLevel: 'slient',
    open: true || config.autoOpen
};

module.exports = (0, _browserSync2.default)(browserSyncOption);