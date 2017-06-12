
'use strict';

import $proxy from './proxy';

export default class {
    constructor() {
        this.config = fozy.__config.mock._proxy;
        this.headers = {
            'accept-encoding': 'gzip;q=0,deflate,sdch,br',
        }
    }

    getMocker() {
        let config = this.config;

        let option = {
            target: config.target,
            headers: this.headers,
        };

        if(config.host) {
            option.host = config.host;
        }
        return $proxy(option);
    }
}
