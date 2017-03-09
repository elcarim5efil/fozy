
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index_page = require('./index_page.js');

var _index_page2 = _interopRequireDefault(_index_page);

var _api = require('./api.js');

var _api2 = _interopRequireDefault(_api);

var _html = require('./html.js');

var _html2 = _interopRequireDefault(_html);

var _template_engine = require('../modules/template_engine');

var _template_engine2 = _interopRequireDefault(_template_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)();

router.get('/fozy/index', new _index_page2.default().getRouter());

router.get('*', new _template_engine2.default({ engine: 'ftl' }).getRouter());

router.get('*', new _html2.default().getRouter());

router.all('*', new _api2.default().getRouter());

exports.default = router;