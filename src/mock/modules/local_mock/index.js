
'use strict';

import AsyncData from './async_data';

let mock = async (ctx, next) => {
    try {
        ctx.body = new AsyncData(ctx).getData();
        ctx.type = 'json';
    } catch(err) {
        return next();
    }
};


export default mock;
