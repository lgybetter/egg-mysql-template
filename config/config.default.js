'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = [];
  
  // mysql config
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: 'lgy',
    database: 'photolive',
  };

  // jwt
  config.jwt = {
    secret: 'photolive'
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  config.multipart = {
    whitelist: [
      '.png',
      '.jpg',
      '.svg',
      '.gif'
    ],
  };

  return config;
};
