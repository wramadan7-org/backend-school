const BaseError = require("../exceptions/baseError");
const { User } = require("../models");

const registerService = async (dataParam, optionsParam) => {
  try {
    const create = await User.create(dataParam, optionsParam);

    return create;
  } catch (error) {
    console.log("Service register error: ", error);
    throw new BaseError("Service register error");
  }
};

module.exports = {
  registerService,
};
