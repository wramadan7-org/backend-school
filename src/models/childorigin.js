"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChildOrigin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChildOrigin.belongsTo(models.Student, { foreignKey: "student_id", as: "student" });
    }
  }
  ChildOrigin.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enterAs: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameSchool: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      certificateYear: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      longStudy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ChildOrigin",
    }
  );
  return ChildOrigin;
};
