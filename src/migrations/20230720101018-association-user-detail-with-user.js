"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_details", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: "id",
      references: {
        model: "Users",
        key: "id"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("user_details", "user_id");
  },
};
