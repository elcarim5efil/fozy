
'use strict';

const __root = fozy.__root;
const path = require('path');
const config = require(path.join(__root, 'fozy.config'));
const $proxy = require('http-proxy').createProxyServer({});

let proxy = opt => {
    return async (ctx, next) => {
        try{
            let req = ctx.req,
                res = ctx.res;
            ctx.response = false;
            $proxy.web(req, res, {
                target: config.mock.proxy,
            });
        }catch(err){
            console.log(err);
        }
    }
};
module.exports = proxy;
