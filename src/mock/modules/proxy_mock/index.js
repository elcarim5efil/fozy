
'use strict';

import $proxy from './proxy';
let proxyConf = fozy.__config.mock.proxy;

// using proxy api
let option = {
    target: proxyConf.target,
    headers: {
        'accept-encoding': 'gzip;q=0,deflate,sdch,br',
    }
};

if(proxyConf.host) {
    option.host = proxyConf.host;
}
let mock = $proxy(option);

module.exports = mock;
