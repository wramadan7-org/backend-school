'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Parents', {
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
        phone_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("ayah", "ibu"),
          allowNull: false,
          defaultValue: "ayah",
        },
        address: {
          type: Sequelize.TEXT,
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

      await queryInterface.addIndex("Parents", ["first_name"]);
      await queryInterface.addIndex("Parents", ["last_name"]);
      await queryInterface.addIndex("Parents", ["phone_number"]);
      await queryInterface.addIndex("Parents", ["type"]);

      await transaction.commit();
    } catch (error) {
      
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeIndex("Parents", ["first_name"]);
      await queryInterface.removeIndex("Parents", ["last_name"]);
      await queryInterface.removeIndex("Parents", ["phone_number"]);
      await queryInterface.removeIndex("Parents", ["type"]);
      await queryInterface.dropTable('Parents');

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};