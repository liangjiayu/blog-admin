import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'egg-orm',
      username: 'root',
      password: '1013834609',
      define: {
        freezeTableName: true,
      },
      timezone: '+8:00',
      dialectOptions: {
        // 让读取date类型数据时返回字符串而不是UTC时间
        dateStrings: true,
        typeCast(field, next) {
          if (field.type === 'DATETIME') {
            return field.string();
          }
          return next();
        },
      },
    },
  };
  return config;
};
