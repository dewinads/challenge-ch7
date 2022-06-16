'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayerRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roomplay.hasMany(models.History, {
        foreignKey: "roomId",
        as: "History",
      });
    }
  }
  PlayerRoom.init({
    roomName: DataTypes.STRING,
    player1: DataTypes.INTEGER,
    player2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'playerRoom',
  });
  return playerRoom;
};