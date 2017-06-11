
'use strict';

import { AsyncData } from '../../data';

export default class LocalMock {
    constructor() {

    }

    getMocker() {
        var mock = async (ctx, next) => {
            try {
                let data = await new AsyncData(ctx).getData();
                console.log(data);
                ctx.body = data;
                ctx.type = 'json';
            } catch(err) {
                return next();
            }
        };
        return mock;
    }
}
