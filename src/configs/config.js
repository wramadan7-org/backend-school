require("dotenv").config();
const Sequelize = require("sequelize");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DIALECT, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  underscored: true,
});

module.exports = {
  sequelize,
};
