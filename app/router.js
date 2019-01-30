'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt();

  router.group({ name: 'index::', prefix: '/api' }, router => {

    router.post('/signup', controller.user.signup);
    router.post('/signin', controller.user.signin);

    router.post('/upload/local', controller.upload.index);

    router.group({
      name: 'auth::',
      prefix: '/auth',
      middlewares: [ jwt ],
    }, router => {
      router.get('/', controller.home.index);

      router.resources('albums', '/albums', controller.album);
    });
  });

};
