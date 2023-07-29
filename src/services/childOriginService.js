const BaseError = require("../exceptions/baseError");
const { ChildOrigin } = require("../models");

const createChildOriginService = async (dataParam) => {
  try {
    const childOrigin = await ChildOrigin.create(dataParam);

    return childOrigin;
  } catch (error) {
    console.log("Service create child origin error: ", error);
    throw new BaseError("Service create child origin error");
  }
};

const findAllChildOriginService = async (optionParam) => {
  try {
    const childOrigins = await ChildOrigin.findAll(optionParam);

    return childOrigins;
  } catch (error) {
    console.log("Service find all child origin error: ", error);
    throw new BaseError("Service find all child origin error");
  }
};

const findChildOriginByParamService = async (dataParam, optionParam) => {
  try {
    const childOrigin = await ChildOrigin.findOne(dataParam, optionParam);

    return childOrigin;
  } catch (error) {
    console.log("Service find child origin by param error: ", error);
    throw new BaseError("Service find child origin by param error");
  }
};

const updateChildOriginByParamService = async (dataParam, optionParam) => {
  try {
    const childOrigin = await ChildOrigin.update(dataParam, optionParam);

    return childOrigin;
  } catch (error) {
    console.log("Service update child origin by param error: ", error);
    throw new BaseError("Service update child origin by param error");
  }
};

const deleteChildOriginByParamService = async (dataParam, optionParam) => {
  try {
    const childOrigin = await ChildOrigin.destroy(dataParam, optionParam);

    return childOrigin;
  } catch (error) {
    console.log("Service delete child origin by param error: ", error);
    throw new BaseError("Service delete child origin by param error");
  }
};

module.exports = {
  createChildOriginService,
  findAllChildOriginService,
  findChildOriginByParamService,
  updateChildOriginByParamService,
  deleteChildOriginByParamService,
};
