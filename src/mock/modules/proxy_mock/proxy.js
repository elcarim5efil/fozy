
'use strict';

import proxy from 'http-proxy';

module.exports = (option, type) => {
    if(typeof option === 'string') {
        option = {
            target: option
        }
    }
    let _proxy = proxy.createProxyServer(option);

    let doProxy = (ctx) => {
        let req = ctx.req,
        res = ctx.res;
        ctx.response = false;
        try{
            _proxy.web(req, res);
        }catch(err){
            console.log('proxy error ', err);
        }
    }
    return async ctx => {
        doProxy(ctx);
    }
};
