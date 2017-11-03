import KoaRouter from 'koa-router';
import html from './html';


export default function Router(config) {
  const router = KoaRouter();
  router.get('*', html(config));
  return router;
}
