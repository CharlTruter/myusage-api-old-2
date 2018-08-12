module.exports.parseEntity = function parseEntity(entity) {
  return {
    id: entity.id,
    name: entity.name,
    friendlyName: entity.friendlyName,
    realmId: entity.realmId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
};
