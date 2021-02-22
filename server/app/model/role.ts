module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Role = app.model.define(
    'role',
    {
      roleId: { type: INTEGER, primaryKey: true, autoIncrement: true }, // 角色id
      roleCode: { type: STRING(255), allowNull: false }, // 角色编码
      roleName: { type: STRING(255), allowNull: false }, // 角色名称
      menuPerm: { type: STRING(255), defaultValue: '' }, // 菜单权限
      apiPerm: { type: STRING(255), defaultValue: '' }, // 接口权限
      createdAt: { type: DATE, field: 'created_at' }, // 创建时间
      updatedAt: { type: DATE, field: 'updated_at' }, // 更新时间
    },
    {},
  );

  return Role;
};
