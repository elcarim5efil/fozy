
'use strict';

import { AsyncData } from '../../data';
const config = fozy.__config;

export default class LocalMock {
    constructor() {

    }

    getMocker() {
        var mock = async (ctx, next) => {
            try {
                let data = await new AsyncData(ctx).getData();
                if( this.isEmptyData(data) ) {
                    data = config.mock.api.defaultData;
                }
                ctx.body = data;
                ctx.type = 'json';
            } catch(err) {
                return next();
            }
        };
        return mock;
    }

    isEmptyData(obj) {
        return Object.keys(obj).length === 0;
    }
}
