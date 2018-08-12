module.exports = (sequelize, DataTypes) => {
  const Entity = sequelize.define('Entity', {
    name: DataTypes.STRING,
    friendlyName: DataTypes.STRING,
    realmId: DataTypes.BIGINT,
  }, {});
  Entity.associate = (models) => {
    Entity.belongsTo(models.Realm, { foreignKey: 'realmId' });
  };
  return Entity;
};
