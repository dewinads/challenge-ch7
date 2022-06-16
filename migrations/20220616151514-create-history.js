'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pilihanPlayer1: {
        type: Sequelize.STRING
      },
      pilihanPlayer2: {
        type: Sequelize.STRING
      },
      winner: {
        type: Sequelize.INTEGER
      },
      roomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "playerRooms",
          key: "id",
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Histories');
  }
};