const httpStatus = require("http-status");
const BaseError = require("./baseError");

const logError = (err, req, res, next) => {
  console.error("STACK", err.stack);
  next(err);
};

const clientErrorHandler = (err, req, res, next) => {
  console.log("CLIENT", err);
  if (req.xhr) {
    console.log("CLIENT XHR");
    res.status(500).send({ code: httpStatus.INTERNAL_SERVER_ERROR, message: "Something failed!" });
  } else {
    console.log("CLIENT ANOTHER");
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  console.log("HANDLER", err);
  if (err instanceof BaseError) {
    console.log("CUSTOM", err)
    return res.status(err.statusCode).send({
      code: err.statusCode,
      message: err.message
    })
  }
  res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ code: httpStatus.INTERNAL_SERVER_ERROR, message: err.message });
};

module.exports = {
  logError,
  clientErrorHandler,
  errorHandler,
};
