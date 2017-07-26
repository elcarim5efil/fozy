import KoaRouter from 'koa-router';
import IndexPage from './index_page';
import Api from './api';
import Html from './html';
import TemplateEngine from '../modules/template_engine';

const router = KoaRouter();

router.get('/fozy/index', new IndexPage().getRouter());

router.get('*', new TemplateEngine({ engine: 'ftl' }).getRouter());

router.get('*', new Html().getRouter());

router.all('*', new Api().getRouter());

export default router;
