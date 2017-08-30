import KoaRouter from 'koa-router';
import Html from './html';

const router = KoaRouter();

router.get('*', new Html().getRouter());

export default router;
