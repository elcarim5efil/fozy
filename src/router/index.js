
'use strict';


import KoaRouter from 'koa-router';
import IndexPage from './index_page.js';
import Api from './api.js';
import Html from './html.js';
import TemplateEngine from '../modules/template_engine';

const router = KoaRouter();

router.get( '/fozy/index', new IndexPage().getRouter() );

router.get( '*', new TemplateEngine({ engine: 'ftl' }).getRouter() );

router.get( '*', new Html().getRouter() );

router.all( '*', new Api().getRouter() );

export default router;
