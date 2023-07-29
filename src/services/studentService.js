const BaseError = require("../exceptions/baseError");
const { Student } = require("../models");

const createStudentService = async (dataParam) => {
  try {
    const student = await Student.create(dataParam);

    return student;
  } catch (error) {
    console.log("Service create student error: ", error);

    if (error.original?.code === "ER_DUP_ENTRY") {
      throw new BaseError(`Service create student error : ${error.original.sqlMessage}`)
    }

    throw new BaseError("Service create student error");
  }
};

const findStudentByIdService = async (dataParam, optionalParam) => {
  try {
    const student = await Student.findOne(dataParam, optionalParam);

    return student;
  } catch (error) {
    console.log("Service find student by ID error: ", error);
    throw new BaseError("Service find student by ID error");
  }
};

const findAllStudentService = async (dataParam, optionalParam) => {
  try {
    const students = await Student.findAll(dataParam, optionalParam);

    return students;
  } catch (error) {
    console.log("Service find all student error: ", error);
    throw new BaseError("Service find all student error");
  }
};

const updateStudentByIdService = async (dataParam, optionalParam) => {
  try {
    const student = await Student.update(dataParam, optionalParam);

    return student;
  } catch (error) {
    console.log("Service update student by id error: ", error);

    if (error.original?.code === "ER_DUP_ENTRY") {
      throw new BaseError(`Service update student error : ${error.original.sqlMessage}`)
    }

    throw new BaseError("Service update student by id error");
  }
}

const deleteStudentByIdService = async (dataParam, optionalParam) => {
  try {
    const student = await Student.destroy(dataParam, optionalParam);

    return student;
  } catch (error) {
    console.log("Service delete student by id error: ", error);
    throw new BaseError("Service delete student by id error");
  }
}

module.exports = {
  createStudentService,
  findStudentByIdService,
  findAllStudentService,
  updateStudentByIdService,
  deleteStudentByIdService,
}