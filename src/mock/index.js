
'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const router = require('koa-router')();
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

const apiMock = require('./modules/api_mock.js');
const proxy = require('./modules/proxy.js');
const fm = require('./modules/ftl_machine');

// ftl mock
router.get('*', fm);

router.get('*', async (ctx, next) => {
    let p = path.join(__root, 'views', ctx.url + '.html');
    try {
        let data = await fs.readFileAsync(p);
        ctx.type = 'html'
        ctx.body = data;
    } catch(err) {
        return next();
    }
});

if(config.mock.proxy) {
    console.log(`[KS] using proxy api: ${config.mock.proxy}`);
    router.all('*', proxy({
        url: config.mock.proxy
    }));
} else {
    console.log('[KS] using local api');
    router.all('*', apiMock);
}

module.exports = router;