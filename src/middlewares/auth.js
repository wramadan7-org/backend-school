const httpStatus = require("http-status");
const { jwtVerify } = require("../utils/jwt");
const BaseError = require("../exceptions/baseError");
const { decryptData } = require("../utils/crypto");

const authenticationToken = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.sendWrapped("Forbidden access", httpStatus.FORBIDDEN);
      return;
    }

    let token = authorization.slice(7, authorization.length);

    token = await jwtVerify(token);

    req.user = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticationToken;
