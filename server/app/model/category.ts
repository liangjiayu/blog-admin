module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Category = app.model.define(
    'category',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      key: { type: STRING(255), allowNull: false }, // 分类关键字
      name: { type: STRING(255) }, // 分类名字
      createdAt: { type: DATE, field: 'created_at' }, // 创建时间
      updatedAt: { type: DATE, field: 'updated_at' }, // 更新时间
    },
    {},
  );

  return Category;
};
