"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.changeColumn(
        "Users",
        "username",
        {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "Users",
        "email",
        {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "user_details",
        "user_id",
        {
          type: Sequelize.INTEGER,
          unique: true,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "user_details",
        "phone_number",
        {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "user_details",
        "nik",
        {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.changeColumn(
        "Users",
        "username",
        {
          type: Sequelize.STRING,
          unique: false,
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "Users",
        "email",
        {
          type: Sequelize.STRING,
          unique: false,
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "user_details",
        "user_id",
        {
          type: Sequelize.INTEGER,
          unique: false,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "user_details",
        "phone_number",
        {
          type: Sequelize.STRING,
          unique: false,
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "user_details",
        "nik",
        {
          type: Sequelize.STRING,
          unique: false,
          allowNull: false,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
