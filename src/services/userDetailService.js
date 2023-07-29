const BaseError = require("../exceptions/baseError");
const { UserDetail } = require("../models");

const createUserDetailService = async (dataParam, optionsParam) => {
  try {
    const userDetail = await UserDetail.create(dataParam, optionsParam);

    return userDetail;
  } catch (error) {
    console.log("Service craete user detail error: ", error);
    
    if (error.original?.code === "ER_DUP_ENTRY") {
      throw new BaseError(`Service create user detail error : ${error.original.sqlMessage}`)
    }

    throw new BaseError("Service create user detail error");
  }
};

const findUserDetailByParamService = async (dataParam, optionsParam) => {
  try {
    const userDetail = await UserDetail.findOne(dataParam, optionsParam);

    return userDetail;
  } catch (error) {
    console.log("Service find user detail by param error: ", error);
    throw new BaseError("Service find user detail by param error");
  }
};

const findAllUserDetailService = async (dataParam) => {
  try {
    const userDetails = await UserDetail.findAll(dataParam);

    return userDetails;
  } catch (error) {
    console.log("Service find all user detail error: ", error);
    throw new BaseError("Service find all user detail error");
  }
};

const updateUserDetailByParamService = async (dataParam, optionsParam) => {
  try {
    const userDetail = await UserDetail.update(dataParam, optionsParam);

    return userDetail;
  } catch (error) {
    console.log("Service update user detail by param error: ", error);

    if (error.original?.code === "ER_DUP_ENTRY") {
      throw new BaseError(`Service update user detail error : ${error.original.sqlMessage}`)
    }

    throw new BaseError("Service update user detail by param error");
  }
};

const deleteUserDetailByParamService = async (dataParam, optionsParam) => {
  try {
    const userDetail = await UserDetail.destroy(dataParam, optionsParam);

    return userDetail;
  } catch (error) {
    console.log("Service delete user detail by param error: ", error);
    throw new BaseError("Service delete user detail by param error");
  }
};

module.exports = {
  createUserDetailService,
  findUserDetailByParamService,
  findAllUserDetailService,
  updateUserDetailByParamService,
  deleteUserDetailByParamService,
};
