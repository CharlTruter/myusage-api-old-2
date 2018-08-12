module.exports = (sequelize, DataTypes) => {
  const EntityUsage = sequelize.define('EntityUsage', {
    bytesDownloaded: DataTypes.BIGINT,
    bytesUploaded: DataTypes.BIGINT,
    usageDate: DataTypes.DATE,
    realmId: DataTypes.BIGINT,
    entityId: DataTypes.BIGINT,
    userId: DataTypes.BIGINT,
  }, {});
  EntityUsage.associate = (models) => {
    EntityUsage.belongsTo(models.Entity, { foreignKey: 'entityId' });
  };
  return EntityUsage;
};
