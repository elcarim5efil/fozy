
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GlobalSyncData = exports.SyncData = exports.AsyncData = exports.LocalData = undefined;

var _local_data = require('./local_data');

var _local_data2 = _interopRequireDefault(_local_data);

var _async_data = require('./async_data');

var _async_data2 = _interopRequireDefault(_async_data);

var _sync_data = require('./sync_data');

var _sync_data2 = _interopRequireDefault(_sync_data);

var _global_sync_data = require('./global_sync_data');

var _global_sync_data2 = _interopRequireDefault(_global_sync_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.LocalData = _local_data2.default;
exports.AsyncData = _async_data2.default;
exports.SyncData = _sync_data2.default;
exports.GlobalSyncData = _global_sync_data2.default;