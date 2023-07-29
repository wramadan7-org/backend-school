"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Parent, {
        through: models.StudentParent,
        foreignKey: "student_id",
        as: "parents",
      });
    }
  }
  Student.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nik: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gradeLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Student",
      indexes: [
        {
          fields: ["firstName"],
        },
        {
          fields: ["lastName"],
        },
        {
          fields: ["nik"],
          unique: true,
        },
        {
          fields: ["gradeLevel"],
        },
        {
          fields: ["phoneNumber"],
        },
      ],
    }
  );
  return Student;
};
