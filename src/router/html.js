
'use strict';

import fs from '../promise/fs';
import path from 'path';
const __root = fozy.__root;
const config = fozy.__config;

export default class {
    constructor() {

    }

    getRouter() {
        return async (ctx, next) => {
            let p = path.join(__root, config.htmlView || 'views', ctx.url + '.html');
            try {
                let data = await fs.readFileAsync(p);
                ctx.type = 'html'
                ctx.body = data;
            } catch(err) {
                return next();
            }
        }
    }
}