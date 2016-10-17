
'use strict';

const handlebars = require('handlebars');
const fs = require('../../lib/promise/fs.js')
const path = require('path');
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

let indexPage = async (ctx, next) => {
    // get page list
    let pages = await getPageList();

    // get index.hbs
    let confTpl = path.join(__dirname, '../../templates/index.hbs');
    let file;
    try{
        file = await fs.readFileAsync(confTpl, 'utf-8');
    } catch(err) {
        return next();
    }

    // compile index.hbs
    let template = handlebars.compile(file);
    let output= template({
        title: 'Pages Index',
        pages,
    });
    ctx.body = output;
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