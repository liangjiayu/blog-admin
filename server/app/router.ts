import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;

  router.get('/', controller.home.index);

  // user
  router.post('/api/user/login', controller.user.login);
  router.post(
    '/api/user/create',
    middleware.authApi([ 'user:create' ]),
    controller.user.create,
  );
  router.post(
    '/api/user/update',
    middleware.authApi([ 'user:update' ]),
    controller.user.update,
  );
  router.post(
    '/api/user/del',
    middleware.authApi([ 'user:del' ]),
    controller.user.del,
  );
  router.post('/api/user/list', controller.user.list);
  router.post('/api/user/getInfoByToken', controller.user.getInfoByToken);

  // role
  router.post(
    '/api/role/create',
    middleware.authApi([ 'role:create' ]),
    controller.role.create,
  );
  router.post(
    '/api/role/update',
    middleware.authApi([ 'role:update' ]),
    controller.role.update,
  );
  router.post(
    '/api/role/del',
    middleware.authApi([ 'role:del' ]),
    controller.role.del,
  );
  router.post('/api/role/list', controller.role.list);
  router.post('/api/role/all', controller.role.all);

  // article
  router.post('/api/article/create', controller.article.create);
  router.post('/api/article/detail', controller.article.detail);
  router.post('/api/article/del', controller.article.del);
  router.post('/api/article/list', controller.article.list);
  router.post('/api/article/update', controller.article.update);

  // category
  router.post('/api/category/create', controller.category.create);
  router.post('/api/category/detail', controller.category.detail);
  router.post('/api/category/del', controller.category.del);
  router.post('/api/category/list', controller.category.list);
  router.post('/api/category/update', controller.category.update);

  // comment
  router.post('/api/comment/create', controller.comment.create);
  router.post('/api/comment/detail', controller.comment.detail);
  router.post('/api/comment/del', controller.comment.del);
  router.post('/api/comment/list', controller.comment.list);
  router.post('/api/comment/update', controller.comment.update);

  // reply
  router.post('/api/reply/create', controller.reply.create);
  router.post('/api/reply/detail', controller.reply.detail);
  router.post('/api/reply/del', controller.reply.del);
  router.post('/api/reply/list', controller.reply.list);
  router.post('/api/reply/update', controller.reply.update);

  // dictionary
  router.post('/api/dict/create', controller.dictionary.create);
  router.post('/api/dict/update', controller.dictionary.update);
  router.post('/api/dict/del', controller.dictionary.del);
  router.post('/api/dict/list', controller.dictionary.list);

  // dictionaryItem
  router.post('/api/dictItem/create', controller.dictionaryItem.create);
  router.post('/api/dictItem/update', controller.dictionaryItem.update);
  router.post('/api/dictItem/del', controller.dictionaryItem.del);
  router.post('/api/dictItem/all', controller.dictionaryItem.all);

  // base
  router.post('/api/base/checkOnly', controller.base.checkOnly);
};
