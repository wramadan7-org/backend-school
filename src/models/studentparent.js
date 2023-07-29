"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentParent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentParent.hasMany(models.Student, {
        as: "students",
        foreignKey: "id",
        sourceKey: "student_id",
      });
      StudentParent.hasMany(models.Parent, {
        as: "parents",
        foreignKey: "id",
        sourceKey: "parent_id",
      });
    }
  }
  // We dont't need to define field because it's juntion table
  StudentParent.init(
    {
      // studentId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // parentId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
    },
    {
      sequelize,
      modelName: "StudentParent",
      indexes: [
        {
          fields: ["studentId"],
        },
        {
          fields: ["parentId"],
        },
      ],
    }
  );
  return StudentParent;
};
