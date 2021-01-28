module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      userId: { type: INTEGER, primaryKey: true, autoIncrement: true }, // 用户id
      username: { type: STRING(255), allowNull: false }, // 用户名称
      password: { type: STRING(255), allowNull: false }, // 用户密码
      roleId: { type: INTEGER, allowNull: false }, // 角色id
      createdAt: { type: DATE, field: 'created_at' }, // 创建时间
      updatedAt: { type: DATE, field: 'updated_at' }, // 更新时间
    },
    {},
  );

  // User.associate = function() {
  //   app.model.User.belongsTo(app.model.Role, {
  //     foreignKey: 'roleId',
  //   });
  // };

  return User;
};
