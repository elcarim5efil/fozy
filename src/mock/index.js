
'use strict';

const fs = require('../../lib/promise/fs');
const path = require('path');
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));
const router = require('koa-router')();

const apiMock = require('./modules/api_mock.js');
const fm = require('./modules/ftl_machine');

// ftl mock
router.get('*', fm);

router.get('*', async (ctx, next) => {
    let p = path.join(__root, config.view || 'views', ctx.url + '.html');
    try {
        let data = await fs.readFileAsync(p);
        ctx.type = 'html'
        ctx.body = data;
    } catch(err) {
        return next();
    }
});

router.all('*', apiMock);

module.exports = router;