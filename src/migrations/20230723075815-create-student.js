'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Students', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        birth_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        grade_level: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        phone_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });

      await queryInterface.addIndex("Students", ["first_name"]);
      await queryInterface.addIndex("Students", ["last_name"]);
      await queryInterface.addIndex("Students", ["grade_level"]);
      await queryInterface.addIndex("Students", ["phone_number"]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeIndex("Students", ["first_name"]);
      await queryInterface.removeIndex("Students", ["last_name"]);
      await queryInterface.removeIndex("Students", ["grade_level"]);
      await queryInterface.removeIndex("Students", ["phone_number"]);
      await queryInterface.dropTable('Students');

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};