module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const DictionaryItem = app.model.define(
    'dictionaryItem',
    {
      dictItemId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(255), allowNull: false },
      value: { type: STRING(255), allowNull: false },
      description: { type: STRING(255), allowNull: true, defaultValue: '' },
      createdAt: { type: DATE, field: 'created_at' },
      updatedAt: { type: DATE, field: 'updated_at' },
    },
    {},
  );

  DictionaryItem.associate = function() {
    app.model.DictionaryItem.belongsTo(app.model.Dictionary, {
      foreignKey: 'dictId',
      targetKey: 'dictId',
      as: 'dictionary',
    });
  };

  return DictionaryItem;
};
