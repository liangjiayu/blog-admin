module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Reply = app.model.define(
    'reply',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      nickname: { type: STRING(255), allowNull: false }, // 回复评论人名字
      email: { type: STRING(255), allowNull: false }, // 回复评论人邮箱
      content: { type: STRING(255), allowNull: false }, // 回复评论内容
      commentId: { type: STRING(255), allowNull: false }, // 回复哪条评论的评论id
      createdAt: { type: DATE, field: 'created_at' }, // 创建时间
      updatedAt: { type: DATE, field: 'updated_at' }, // 更新时间
    },
    {
      freezeTableName: true,
      // timestamps: false,
    },
  );

  return Reply;
};
