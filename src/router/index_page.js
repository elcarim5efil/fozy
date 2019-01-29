const path = require('path');
const handlebars = require('handlebars');
const fs = require('../promise/fs');
const isFozy = require('../util/is_fozy');

const root = fozy.root;
const config = fozy.config;

module.exports = class IndexPage {
  constructor() {
    this.pageList = null;
    this.html = null;
    this.templatePath = path.join(__dirname, '../../templates/index.hbs');
  }

  getRouter() {
    const indexPage = async (ctx, next) => {
      if (ctx.method.toLowerCase() === 'get' && isFozy(ctx.url)) {
        const res = await this.respondHtml(ctx, next);
        return res;
      }
      return next();
    };
    return indexPage;
  }

  async respondHtml(ctx, next) {
    ctx.body = await this.getHtml(ctx, next);
  }

  async getPageList() {
    if (!this.pageList) {
      if (config.pages && config.pages.length > 0) {
        this.pageList = config.pages;
      } else {
        this.pageList = this.createPageList();
      }
    }
    return this.pageList;
  }

  async getHtml(ctx, next) {
    const pageList = await this.getPageList();
    if (!this.html) {
      let file;
      try {
        file = await fs.readFileAsync(this.templatePath, 'utf-8');
      } catch (err) {
        return next();
      }

      const template = handlebars.compile(file);
      this.html = template({
        title: 'Pages Index',
        pages: pageList,
      });
    }
    return this.html;
  }

  async createPageList() {
    let p;
    let files = [];
    let temp;
    // templates
    p = path.join(root, config.template.root, config.template.page);
    temp = await fs.readdirAsync(p);
    files = files.concat(temp);
    // views
    if (config.view !== '') {
      p = path.join(root, config.view);
      temp = await fs.readdirAsync(p);
      files = files.concat(temp);
    }

    const pages = files.map((item) => {
      const parts = item.split('.');
      parts.splice(parts.length - 1, 1);
      const name = parts.join('.');
      return { name, url: `/${name}` };
    });
    return pages;
  }
}
