require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const httpStatus = require("http-status");
const {
  logError,
  clientErrorHandler,
  errorHandler,
} = require("./exceptions/errorHandler");
const { sequelize } = require("./configs/config");
const route = require("./routes/index");

const app = express();
const { NODE_PORT } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(morgan("dev"));

app.use("/v1", route);

app.response.sendWrapped = function (message, statusCode, data) {
  return this.status(statusCode).send({
    code: statusCode,
    message,
    data,
  });
};

async function testConnectionDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnectionDB();

app.use((req, res, next) => {
  console.log("Sorry can't find that!");
  res
    .status(httpStatus.NOT_FOUND)
    .send({ code: httpStatus.NOT_FOUND, message: "Sorry can't find that!" });
});

app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(NODE_PORT, () => {
  console.log(`Server running at port: ${NODE_PORT}`);
});

module.exports = app;
