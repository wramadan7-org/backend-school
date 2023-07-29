'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("child_origins", "student_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: "id",
      references: {
        model: "Students",
        key: "id"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("child_origins", "student_id");
  },
};
