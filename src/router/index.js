import KoaRouter from 'koa-router';
import IndexPage from './index_page';
import Html from './html';

const router = KoaRouter();

router.get('/fozy/index', new IndexPage().getRouter());

router.get('*', new Html().getRouter());

export default router;
