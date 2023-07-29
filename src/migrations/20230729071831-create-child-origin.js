"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("child_origins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enter_as: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name_school: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      certificate_year: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      long_study: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("child_origins");
  },
};
