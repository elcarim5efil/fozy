
'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const router = require('koa-router')();
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

const apiMock = require('./api_mock.js');
const proxy = require('./proxy.js');
const fm = require('./ftl_machine');

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
    router.all('*', proxy({
        url: config.mock.proxy
    }));
} else {
    console.log('local');
    router.all('*', apiMock);
}

module.exports = router;
