
'use strict';

import proxy from 'http-proxy';
let proxyConf = fozy.__config.mock.proxy;

module.exports = (option, type) => {
    if(typeof option === 'string') {
        option = {
            target: option
        }
    }
    let _proxy = proxy.createProxyServer(option);
    
    _proxy.on('proxyReq', function(proxyReq, req, res){
        if(proxyConf.host) {
            proxyReq.setHeader('Host', proxyConf.host);
        }
    });

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
