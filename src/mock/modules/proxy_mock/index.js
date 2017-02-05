
'use strict';

import $proxy from './proxy';
let proxyConf = fozy.__config.mock.proxy;

// using proxy api
let option = {
    target: proxyConf.target,
    // changeOrigin: true,
    // autoRewrite: true,
    // cookieDomainRewrite: 'localhost:9000',
    headers: {
        // test: 'test',
        // host: proxyConf.host,
        'accept-encoding': 'gzip;q=0,deflate,sdch,br',
        // origin: 'http://10.240.176.101:9001',
    }
};

if(proxyConf.host) {
    option.host = proxyConf.host;
}
let mock = $proxy(option);

module.exports = mock;
