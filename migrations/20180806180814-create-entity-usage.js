'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EntityUsages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bytesDownloaded: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      bytesUploaded: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      usageDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      realmId: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      entityId: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      userId: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EntityUsages');
  }
};
