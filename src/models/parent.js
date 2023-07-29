"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parent.belongsToMany(models.Student, {
        through: models.StudentParent,
        foreignKey: "parent_id",
        as: "students",
      });
    }
  }
  Parent.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("ayah", "ibu"),
        allowNull: false,
        defaultValue: "ayah",
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Parent",
      indexes: [
        {
          fields: ["firstName"],
        },
        {
          fields: ["lastName"],
        },
        {
          fields: ["phoneNumber"],
        },
        {
          fields: ["type"],
        },
      ],
    }
  );
  return Parent;
};
