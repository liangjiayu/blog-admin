module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Article = app.model.define(
    'article',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: STRING(255), allowNull: false }, // 文章标题
      content: { type: STRING(255), allowNull: false }, // 文章内容
      author: { type: STRING(255), allowNull: true }, // 文章作者
      description: { type: STRING(255), allowNull: true }, // 文章简介
      keyword: { type: STRING(255), allowNull: true }, // 文章关键字
      cover: { type: STRING(255), allowNull: true }, // 文章封面
      browse: { type: STRING(255), allowNull: true }, // 文章浏览数
      createdAt: { type: DATE, field: 'created_at' }, // 创建时间
      updatedAt: { type: DATE, field: 'updated_at' }, // 更新时间
    },
    {
      freezeTableName: true,
      // timestamps: false,
    },
  );

  return Article;
};
