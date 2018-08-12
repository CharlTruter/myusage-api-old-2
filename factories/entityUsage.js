module.exports.parseEntityUsage = function parseEntityUsage(entityUsage) {
  return {
    id: entityUsage.id,
    bytesDownloaded: entityUsage.bytesDownloaded,
    bytesUploaded: entityUsage.bytesUploaded,
    usageDate: entityUsage.usageDate,
    realmId: entityUsage.realmId,
    entityId: entityUsage.entityId,
    userId: entityUsage.userId,
    createdAt: entityUsage.createdAt,
    updatedAt: entityUsage.updatedAt,
  };
};
