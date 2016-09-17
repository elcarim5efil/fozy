
'use strict';

const Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs')),
    path = require('path'),
    router = require('koa-router')(),
    proxy = require('koa-proxy'),
    convert = require('koa-convert'),
    Freemarker = require('freemarker.js');


const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

const fm = Promise.promisifyAll(new Freemarker({
    viewRoot: path.join(__root, config.template.path),
    options: {

    }
}));

if(config.mock.proxy) {
    router.all('*', convert(proxy({
        host: config.mock.proxy
    })));
} else {
    // api mock
    router.all('*', async (ctx, next) => {
        let p = path.join(__root, config.mock.api, ctx.method, ctx.url, 'data.json')
        try {
            // api mock data
            let data = await fs.readFileAsync(p);
            let json = JSON.parse(data);
            ctx.body = json;
            ctx.type = 'json';
        } catch(err) {
            return next();
        }
    });
}


// ftl mock
const gp = path.join(__root, config.template.mock, 'global/data.json');
router.get('*', async (ctx, next) => {
    let p = path.join(__root, config.template.mock, ctx.url + '.json');
    try {
        // page ftl mock data
        let data = await fs.readFileAsync(p);
        // global ftl mock data
        let gData = await fs.readFileAsync(gp);
        // make json
        let json = JSON.parse(data);
        json = Object.assign(json, JSON.parse(gData));
        // render template
        let html = await fm.renderAsync(ctx.url+'.ftl', json);

        ctx.body = html;
    } catch(err) {
        return next();
    }
});

router.get('*', async (ctx, next) => {
    let p = path.join(__root, 'views', ctx.url + '.html');
    try {
        let data = await fs.readFileAsync(p);
        ctx.type = 'html'
        ctx.body = data;
    } catch(err) {
        return next();
    }

})

module.exports = router;