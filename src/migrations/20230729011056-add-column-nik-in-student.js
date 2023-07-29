"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Students", "nik", {
      type: Sequelize.STRING,
      allowNull: false,
      after: "last_name",
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Students", "nik");
  },
};
