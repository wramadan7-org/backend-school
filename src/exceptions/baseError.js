const httpStatus = require("http-status");

class BaseError extends Error {
  constructor(message, statusCode = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = "Base Error";
    this.message = message;
    this.statusCode = statusCode
  }
}

module.exports = BaseError;