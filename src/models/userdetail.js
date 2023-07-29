"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetail.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  UserDetail.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nik: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserDetail",
      indexes: [
        {
          unique: true,
          fields: ["userId"],
        },
        {
          unique: true,
          fields: ["phoneNumber"],
        },
        {
          unique: true,
          fields: ["nik"],
        },
      ],
    }
  );
  return UserDetail;
};
