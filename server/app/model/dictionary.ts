module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Dictionary = app.model.define(
    'dictionary',
    {
      dictId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      dictName: { type: STRING(255), allowNull: false },
      dictCode: { type: STRING(255), allowNull: false },
      description: { type: STRING(255), allowNull: true, defaultValue: '' },
      createdAt: { type: DATE, field: 'created_at' },
      updatedAt: { type: DATE, field: 'updated_at' },
    },
    {},
  );

  Dictionary.associate = function() {
    app.model.Dictionary.hasMany(app.model.Dictionary, {
      foreignKey: 'dictId',
      sourceKey: 'dictId',
      as: 'dictionaryItem',
    });
  };

  return Dictionary;
};
