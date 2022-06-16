'use strict';
const { Model } = require('sequelize');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: "userId",
        as: "Profile"
      });
    }

    static async register({ username, password }) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      /*
        #encrypt dari static method
        encryptedPassword akan sama dengan string 
        hasil enkripsi password dari method #encrypt
      */
      return this.create({ username, password: encryptedPassword });
    }

    static async authenticate({ username, password }) {
      try {
        const user = await this.findOne({ where: { username } });
        if (!user) return Promise.reject("User not found!");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return Promise.reject("Wrong password");

        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    generateToken() {
      // Jangan memasukkan password ke dalam payload
      const payload = {
        id: this.id,
        username: this.username,
      };
      // Rahasia ini nantinya kita pakai untuk memverifikasi apakah token ini benar-benar berasal dari aplikasi kita
      const rahasia = "Rahasia ya";
      // Membuat token dari data-data diatas
      const token = jwt.sign(payload, rahasia);
      return token;
    }
  }

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};