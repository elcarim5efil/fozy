
'use strict';

import handlebars from 'handlebars';
import fs from '../../lib/promise/fs.js'
import path from 'path';

const __root = fozy.__root;
const config = fozy.__config;

export default class IndexPage {
    constructor() {
        this.pageList = null;
        this.html = null;
        this.templatePath = path.join(__dirname, '../../templates/index.hbs');
    }

    getRouter() {
        let indexPage = async (ctx, next) => {
            return await this.respondHtml(ctx, next);
        };
        return indexPage;
    }

    async respondHtml(ctx, next) {
        ctx.body = await this.getHtml(ctx, next);
    }

    async getPageList() {
        if( !this.pageList ) {
            if(config.pages && config.pages.length > 0){
                this.pageList = config.pages;
            } else {
                this.pageList = this.createPageList();
            }
        }
        return this.pageList;
    }

    async getHtml(ctx, next) {
        let pageList = await this.getPageList();
        if( !this.html ) {
            let file;
            try{
                file = await fs.readFileAsync(this.templatePath, 'utf-8');
            } catch(err) {
                return next();
            }

            let template = handlebars.compile(file);
            this.html = template({
                title: 'Pages Index',
                pages: pageList,
            });
        }
        return this.html;
    }

    async createPageList() {
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
        return pages;
    }
}


