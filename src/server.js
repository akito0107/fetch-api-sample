import koa from 'koa';
import serve from 'koa-static';
import koaRouter from 'koa-router';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import path from 'path';

const app = koa();
const router = koaRouter();
const body = koaBody();

app.use(logger());
app.use(serve(path.resolve(__dirname, './public')));
app.use(function* (next) {
  this.type = 'json';
  yield next;
});

router.get('/api/basic', function* (next) {
  this.body = {success: 'ok'};
  yield next;
});

router.post('/api/post', body, function* (next) {
  console.log(this.request.body);

  this.body = {success: 'ok'};
  yield next;
});

app.use(router.routes());

app.listen(3000);
