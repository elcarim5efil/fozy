
'use strict';

import path from 'path';
import _  from '../../util/extend';
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

let proxyConf = config.mock.proxy;
let mock;

if(config.mock.proxy){
    console.log(`[KS] using proxy api: ${proxyConf.target}`);
    mock = require('./proxy_mock')
} else {
    console.log('[KS] using local api');
    mock = require('./local_mock')
}


module.exports = mock;