const BaseError = require("../exceptions/baseError");
const { Parent } = require("../models");

const createParentService = async (dataParam) => {
  try {
    const parent = await Parent.create(dataParam);

    return parent;
  } catch (error) {
    console.log("Service create parent error: ", error);
    throw new BaseError("Service create parent error");
  }
};

const findParentByIdService = async (dataParam, optionalParam) => {
  try {
    const parent = await Parent.findOne(dataParam, optionalParam);

    return parent;
  } catch (error) {
    console.log("Service find parent by ID error: ", error);
    throw new BaseError("Service find parent by ID error");
  }
};

const findAllParentService = async (dataParam, optionalParam) => {
  try {
    const parents = await Parent.findAll(dataParam, optionalParam);

    return parents;
  } catch (error) {
    console.log("Service find all parent error: ", error);
    throw new BaseError("Service find all parent error");
  }
};

const updateParentByIdService = async (dataParam, optionalParam) => {
  try {
    const parent = await Parent.update(dataParam, optionalParam);

    return parent;
  } catch (error) {
    console.log("Service update parent by id error: ", error);
    throw new BaseError("Service update parent by id error");
  }
};

const deleteParentByIdService = async (dataParam, optionalParam) => {
  try {
    const parent = await Parent.destroy(dataParam, optionalParam);

    return parent;
  } catch (error) {
    console.log("Service delete parent by id error: ", error);
    throw new BaseError("Service delete parent by id error");
  }
};

module.exports = {
  createParentService,
  findParentByIdService,
  findAllParentService,
  updateParentByIdService,
  deleteParentByIdService,
};
