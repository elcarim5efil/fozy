
'use strict';

import path from 'path';
import  _ from '../../../util/extend';
const __root = fozy.__root;
const config  = require(path.join(__root, 'fozy.config'));
const templateRoot = path.join(__root, config.template.root || '');

import SyncData from './sync_data.js';

let engine;

let tplEngine = (option) => {
    let fileType = '';
    if(option.engine === 'ftl') {
        engine = require('../../../engine/freemarker')({
            viewRoot: templateRoot,
            options: {
                // sourceEncoding: 'UTF-8',
            }
        });
        fileType = '.ftl'
    }
    return async (ctx, next) => {
        let tplPath = getPathByUrl(_.removeQueryString(ctx.url));
        let isTplExist = tplPath !== -1 && _.isFileExist( path.join(templateRoot, tplPath) )

        if( !isTplExist ) {
            return next();
        }

        let json = new SyncData({
            ctx: ctx,
            fileType: fileType,
            path: _.removePostfix(tplPath),
        }).getData();

        try {
            let html = await engine.render(tplPath, json || {});
            ctx.body = html;
        } catch(err) {
            console.error('[KS] render error, please check your template files and json files');
        }
    };
};

/**
 * get path by url in the config.pages
 * @param  {string} url matching url
 * @return {string/number}     path, -1: not found
 */
function getPathByUrl(url) {
    let res = -1;
    _.which(config.pages, item => {
        if(item.url === url) {
            res = item.path;
            return true;
        }
    });
    return res;
}

export default tplEngine ;