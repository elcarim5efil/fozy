
'use strict';

import $proxy from './proxy';
let proxyConf = fozy.__config.mock.proxy;

// using proxy api
let mock = $proxy({
    target: proxyConf.target,
    changeOrigin: true,
    autoRewrite: true,
    // cookieDomainRewrite: '',
    headers: {
        // test: 'test',
        host: proxyConf.host,
    }
});

module.exports = mock;
