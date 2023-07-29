const { StudentParent } = require("../models");
const BaseError = require("../exceptions/baseError");

const craeteStudentParentService = async (dataParam) => {
  try {
    console.log("STUDENT", dataParam)
    const studentParent = await StudentParent.create(dataParam);

    return studentParent;
  } catch (error) {
    console.log("Service create student parent error: ", error);
    throw new BaseError("Service create student parent error");
  }
};

const findStudentParentByIdService = async (dataParam, optionParam) => {
  try {
    const studentParent = await StudentParent.findOne(dataParam, optionParam);

    return studentParent;
  } catch (error) {
    console.log("Service find student parent by ID error: ", error);
    throw new BaseError("Service find student parent by ID error");
  }
};

const findAllStudentParentService = async (dataParam, optionParam) => {
  try {
    const studentParents = await StudentParent.findAll(dataParam, optionParam);

    return studentParents;
  } catch (error) {
    console.log("Service find all student parent error: ", error);
    throw new BaseError("Service find all student parent error");
  }
};

const updateStudentParentByIdService = async (dataParam, optionParam) => {
  try {
    const studentParent = await StudentParent.update(dataParam, optionParam);

    return studentParent;
  } catch (error) {
    console.log("Service update student parent by ID error: ", error);
    throw new BaseError("Service update student parent by ID error");
  }
};

const deleteStudentParentByIdService = async (dataParam, optionParam) => {
  try {
    const studentParent = await StudentParent.destroy(dataParam, optionParam);

    return studentParent;
  } catch (error) {
    console.log("Service delete student parent by ID error: ", error);
    throw new BaseError("Service delete student parent by ID error");
  }
};

module.exports = {
  craeteStudentParentService,
  findStudentParentByIdService,
  findAllStudentParentService,
  updateStudentParentByIdService,
  deleteStudentParentByIdService,
};
