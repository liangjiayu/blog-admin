import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;

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
