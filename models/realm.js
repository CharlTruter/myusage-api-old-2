module.exports = (sequelize, DataTypes) => {
  const Realm = sequelize.define('Realm', {
    name: DataTypes.STRING,
    userId: DataTypes.BIGINT,
    enabled: DataTypes.BOOLEAN,
  }, {});
  Realm.associate = () => {
  };
  return Realm;
};
