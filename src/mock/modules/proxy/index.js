
'use strict';

import path from 'path';
import _  from '../../../util/extend';
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));
import $proxy from './proxy';

let proxyConf = config.mock.proxy;
// using proxy api
let mock = $proxy({
    target: proxyConf.target,
    headers: {
        test: 'test',
        host: proxyConf.host,
    }
});

module.exports = mock;
