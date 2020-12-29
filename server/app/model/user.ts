module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      nickname: { type: STRING(255), allowNull: false }, // 名称
      email: { type: STRING(255), allowNull: false }, // 邮箱
      password: { type: STRING(255), allowNull: true }, // 密码
      createdAt: { type: DATE, field: 'created_at' }, // 创建时间
      updatedAt: { type: DATE, field: 'updated_at' }, // 更新时间
    },
    {
      freezeTableName: true,
      // timestamps: false,
    },
  );

  return User;
};
