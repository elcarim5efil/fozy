
'use strict';

// const request = require('./koa_request');
const __root = fozy.__root;
const path = require('path');
const config = require(path.join(__root, 'fozy.config'));
const _request = require('request');
// const $proxy = require('http-proxy').createProxyServer({target: config.mock.proxy});

let proxy = opt => {
    return async (ctx, next) => {
        let options = {
            url: opt.url + ctx.url,
            headers: ctx.header,
            body: getParsedBody(ctx),
        };
        // console.log(ctx);
        // try{
        //     let res = await (request[ctx.method.toLowerCase()+'Async'])(options);
        //     ctx.status = res.statusCode;
        //     ctx.body = res.body;
        //     for (var name in res.headers) {
        //         if (name === 'transfer-encoding') {
        //             continue;
        //         }
        //         ctx.set(name, res.headers[name]);
        //     }
        // }catch(err){
        //     console.log('[KS] API proxy error', err);
        // }
        try{
            // ctx.body = _request(opt.url + ctx.url);
            // debugger;
            var d = ctx.res;
            $proxy.web(ctx.req, ctx.res, function(){
                console.log(arguments);
            });
            $proxy.on('error', function(e){
                console.log(e);
            })
            console.log(ctx.res);
            console.log(d === ctx.res);
        }catch(err){
            console.log(err);
        }
    }
};

function getParsedBody(ctx){
    let body = ctx.req.body;
    if (body === undefined || body === null){
        return undefined;
    }
    let contentType = ctx.req.header['content-type'];
    if (!Buffer.isBuffer(body) && typeof body !== 'string'){
        if (contentType && contentType.indexOf('json') !== -1){
            body = JSON.stringify(body);
        } else {
            body = body + '';
        }
    }
    return body;
}

module.exports = proxy;
