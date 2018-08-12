module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
  }, {});
  User.associate = () => {
  };
  return User;
};
