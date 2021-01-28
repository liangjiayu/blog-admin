module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define(
    'comment',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      nickname: { type: STRING(255), allowNull: false }, // 评论人名字
      email: { type: STRING(255), allowNull: false }, // 评论人邮箱
      content: { type: STRING(255), allowNull: false }, // 评论内容
      targetId: { type: STRING(255), allowNull: false }, // 评论目标id
      targetType: { type: STRING(255), allowNull: false }, // 评论类型
      createdAt: { type: DATE, field: 'created_at' }, // 创建时间
      updatedAt: { type: DATE, field: 'updated_at' }, // 更新时间
    },
    {},
  );

  return Comment;
};
