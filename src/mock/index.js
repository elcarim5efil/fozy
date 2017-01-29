
'use strict';

import fs from '../../lib/promise/fs';
import path from 'path';
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));
const router = require('koa-router')();

import apiMock from './modules/api_mock.js';
import templateEngine from './modules/template_engine';

// template mock
router.get('*', templateEngine({engine: 'ftl'}));

router.get('*', async (ctx, next) => {
    let p = path.join(__root, config.htmlView || 'views', ctx.url + '.html');
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