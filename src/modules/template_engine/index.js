
'use strict';

import path from 'path';
import  _ from '../../util/extend';
const __root = fozy.__root;
const config = fozy.__config;
const templateRoot = path.join(__root, config.template.root || '');

import { SyncData } from '../data';

export default class Engine {
    constructor(option) {
        this.pages = config.pages;
        if(option.engine === 'ftl') {
            this.createEngine(option)
            this.fileType = '.ftl'
        }
    }

    createEngine(option) {
        this.engine = require('../../engine/freemarker')({
            viewRoot: templateRoot,
            options: {
                // sourceEncoding: 'UTF-8',
            }
        });

        return this.engine;
    }

    getRouter(option) {
        return async (ctx, next) => {
            let tplPath = this.getPathByUrl(_.removeQueryString(ctx.url));

            if( !this.isTplFileExist(tplPath) ){
                return next();
            }

            let json = this.getSyncData(ctx, tplPath);
            await this.respondHtml(ctx, json, tplPath);
        };
    }

    getPathByUrl(url) {
        let res = -1;
        _.which(config.pages, item => {
            if(item.url === url) {
                res = item.path;
                return true;
            }
        });
        return res;
    }

    isTplFileExist(tplPath) {
        return tplPath !== -1 && _.isFileExist( path.join(templateRoot, tplPath) )
    }

    getSyncData(ctx, tplPath) {
        return new SyncData({
            ctx: ctx,
            fileType: this.fileType,
            path: _.removePostfix(tplPath),
        }).getData();
    }

    async respondHtml(ctx, json, tplPath) {
        let result = {
            output: '',
            html: '',
        };
        
        try {
            result = await this.engine.render(tplPath, json || {});
        } catch(err) {
            result.html = '[KS] render error, please check your template files and json files';
            console.error('[KS] render error, please check your template files and json files');
        }

        if( /(^>>>\sABORTED!\s<<<).*/.test(result.output) ) {
            ctx.body = result.output;
        } else {
            ctx.body = result.html;
        }
    }
}
