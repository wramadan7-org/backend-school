require("dotenv").config();
const jwt = require("jsonwebtoken");
const BaseError = require("../exceptions/baseError");
const { decryptData } = require("./crypto");

const { JWT_SECRET } = process.env;

const jwtSign = async (data, options) => {
  if (!JWT_SECRET) {
    throw new BaseError("JWT_SECRET is required");
  }

  try {
    if (options) {
      return await jwt.sign(data, JWT_SECRET, options);
    }

    return await jwt.sign(data, JWT_SECRET);
  } catch (error) {
    throw new BaseError(error.message);
  }
};

const jwtVerify = async (data) => {
  if (!JWT_SECRET) {
    throw new BaseError("JWT_SECRET is required");
  }

  try {
    const decrypt = await decryptData(data);

    const verify = await jwt.verify(decrypt, JWT_SECRET);

    return verify;
  } catch (error) {
    throw new BaseError(error.message);
  }
};

module.exports = {
  jwtSign,
  jwtVerify,
};
