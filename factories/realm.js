module.exports.parseRealm = function parseRealm(realm) {
  return {
    id: realm.id,
    userId: realm.userId,
    name: realm.name,
    enabled: realm.enabled,
    createdAt: realm.createdAt,
    updatedAt: realm.updatedAt,
  };
};
