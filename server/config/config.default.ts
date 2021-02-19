import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1607506827239_9807';

  // add your egg config in here
  config.middleware = [ 'authToken', 'errorHandler' ];

  // my
  config.security = {
    csrf: {
      ignore: '/api/*/*', // 白名单
    },
  };

  config.jwt = {
    secretKey: 'secretKey',
    expiresIn: 60 * 60,
  };

  config.cors = {
    origin: '*', // 表示允许的源
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 表示允许的http请求方式
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
