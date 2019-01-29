const KoaRouter = require('koa-router');
const Html = require('./html');

const router = KoaRouter();

router.get('*', new Html().getRouter());

module.exports = router;
