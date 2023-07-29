const BaseError = require("../exceptions/baseError");
const { User } = require("../models");

const createUserService = async (data) => {
  try {
    const user = await User.create(data);

    return user;
  } catch (error) {
    console.log("Service create user error: ", error);

    if (error.original?.code === "ER_DUP_ENTRY") {
      throw new BaseError(`Service create user error : ${error.original.sqlMessage}`)
    }

    throw new BaseError("Service create user error");
  }
};

const findUserByParamService = async (dataParam, optionsParam) => {
  try {
    const user = await User.findOne(dataParam, optionsParam);

    return user;
  } catch (error) {
    console.log("Service find user by param error: ", error);
    throw new BaseError("Service find user by param error");
  }
};

const findAllUserService = async (dataParam) => {
  try {
    const users = await User.findAll(dataParam);

    return users;
  } catch (error) {
    console.log("Service find all user error: ", error);
    throw new BaseError("Service find all user error");
  }
};

const updateUserByParamService = async (dataParam, optionsParam) => {
  try {
    const user = await User.update(dataParam, optionsParam);

    return user;
  } catch (error) {
    console.log("Service update user by param error: ", error);

    if (error.original?.code === "ER_DUP_ENTRY") {
      throw new BaseError(`Service update user error : ${error.original.sqlMessage}`)
    }

    throw new BaseError("Service update user by param error");
  }
};

const deleteUserByParamService = async (dataParam, optionsParam) => {
  try {
    const user = await User.destroy(dataParam, optionsParam);

    return user;
  } catch (error) {
    console.log("Service delete user by param error: ", error);
    throw new BaseError("Service delete user by param error");
  }
};

module.exports = {
  createUserService,
  findUserByParamService,
  findAllUserService,
  updateUserByParamService,
  deleteUserByParamService,
};
