module.exports.parseUser = function parseUser(user) {
  return {
    id: user.id,
    username: user.username,
    enabled: user.enabled,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

module.exports.parseJwtUser = function parseJwtUser(user) {
  return {
    id: user.id,
    username: user.username,
    password: user.password,
    enabled: user.enabled,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
