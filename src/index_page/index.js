
'use strict';

const Promise = require('bluebird');
const Freemarker = require('freemarker.js');
const fs = require('../../lib/promise/fs.js')
const path = require('path');
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));
const fm = Promise.promisifyAll(new Freemarker({
    viewRoot: path.join(__dirname, '../../templates'),
    options: {
    }
}));


let indexPage = async (ctx, next) => {
    let pages = await getPageList();
    let html = await fm.renderAsync('index.ftl', {
        title: 'Pages Index',
        pages: pages,
    });
    ctx.body = html;
};
/**
 * Access the page list, if config.pages is configed, then it will be returned
 * @return {Promise} [description]
 */
async function getPageList() {
    if(config.pages && config.pages.length > 0){
        return config.pages;
    }
    let p, files = [], temp;
    // templates
    p = path.join(__root, config.template.root, config.template.page);
    temp = await fs.readdirAsync(p)
    files = files.concat(temp);
    // views
    if(config.view !== '') {
        p = path.join(__root, config.view);
        temp = await fs.readdirAsync(p)
        files = files.concat(temp);
    }

    let pages = files.map(function(item){
        let parts = item.split('.');
        parts.splice(parts.length - 1,1);
        let name = parts.join('.');
        return {name: name, url: '/'+name};
    });
    console.log(pages);
    return pages;
}

module.exports = indexPage;