
'use strict';

import { AsyncData } from '../../data';

export default class LocalMock {
    constructor() {

    }

    getMocker() {
        var mock = async (ctx, next) => {
            try {
                ctx.body = new AsyncData(ctx).getData();
                ctx.type = 'json';
            } catch(err) {
                return next();
            }
        };
        return mock;
    }
}
