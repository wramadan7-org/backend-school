"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable("student_parents", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        student_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Students",
            key: "id"
          }
        },
        parent_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Parents",
            key: "id"
          }
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });

      await queryInterface.addIndex("student_parents", ["student_id"]);
      await queryInterface.addIndex("student_parents", ["parent_id"]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeIndex("student_parents", ["student_id"]);
      await queryInterface.removeIndex("student_parents", ["parent_id"]);
      await queryInterface.dropTable("student_parents");

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
