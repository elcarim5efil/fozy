
'use strict';

import path from 'path';
import _  from '../util/extend';
import { Proxy, Local } from '../modules/async_mock';

const __root = fozy.__root;
const config = fozy.__config;
const proxyConf = config.mock._proxy;

export default class Api {
    constructor() {
        if(proxyConf){
            console.log(`[KS] using proxy api: ${proxyConf.target}`);
            this.mock = new Proxy().getMocker();
        } else {
            console.log('[KS] using local api');
            this.mock = new Local().getMocker();
        }
    }

    getRouter() {
        return this.mock;
    }

}

