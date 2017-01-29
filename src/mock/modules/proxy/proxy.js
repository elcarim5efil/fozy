
'use strict';

import proxy from 'http-proxy';

module.exports = (option, type) => {
    if(typeof option === 'string') {
        option = {
            target: option
        }
    }
    let _proxy = proxy.createProxyServer({});
    _proxy.on('proxyReq', function(proxyReq, req, res, option) {
        // console.log('req..........', proxyReq);
        proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
        console.log('req..........', proxyReq);
    });
    _proxy.on('proxyRes', function (proxyRes, req, res) {
        // console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
        console.log('res.....', proxyRes);
    });
    let doProxy = (ctx) => {
        let req = ctx.req,
        res = ctx.res;
        ctx.response = false;
        try{
            _proxy.web(req, res, option);
        }catch(err){
            console.log('proxy error ', err);
        }
    }
    return async ctx => {
        doProxy(ctx);
    }
};
