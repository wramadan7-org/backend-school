const httpStatus = require("http-status");
const BaseError = require("../exceptions/baseError");
const catchAsync = require("../utils/catchAsync");
const {
  craeteStudentParentService,
  findStudentParentByIdService,
  findAllStudentParentService,
  updateStudentParentByIdService,
  deleteStudentParentByIdService,
} = require("../services/studentParentService");
const { Op, where } = require("sequelize");
const { Student, Parent, StudentParent } = require("../models");
const { findStudentByIdService } = require("../services/studentService");
const { findParentByIdService } = require("../services/parentService");
const { sequelize } = require("../configs/config");

const craeteStudentParentController = catchAsync(async (req, res) => {
  const { studentId, parentId } = req.body;

  const validStudent = await findStudentByIdService({
    where: { id: studentId },
  });
  const validParent = await findParentByIdService({ where: { id: parentId } });

  if (!validStudent) throw new BaseError("Invalid student ID");
  if (!validParent) throw new BaseError("Invalid parent ID");

  // const studentIdData = validStudent.id;
  // const parentIdData = validParent.id;
  const data = {
    student_id: validStudent.id,
    parent_id: validParent.id,
  };

  const studentParent = await craeteStudentParentService(data);

  res.sendWrapped(
    "Create student and parent association successfully",
    httpStatus.CREATED,
    studentParent
  );
});

const findStudentParentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const studentParent = await findStudentParentByIdService({
    where: { id },
    include: [
      { model: Student, as: "students" },
      { model: Parent, as: "parents" },
    ],
  });

  if (!studentParent)
    throw new BaseError(
      `Student and parent with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  const data = {
    id,
    ...studentParent.dataValues,
  };

  res.sendWrapped(`Student and parent with ID ${id}`, httpStatus.OK, data);
});

const findAllStudentParentController = catchAsync(async (req, res) => {
  const studentParents = await findAllStudentParentService({
    include: [
      { model: Parent, as: "parents" },
      { model: Student, as: "students" },
    ],
    attributes: [
      "id",
      [sequelize.col("StudentParent.parent_id"), "parentId"],
      [sequelize.col("StudentParent.student_id"), "studentId"],
      [sequelize.col("StudentParent.created_at"), "createdAt"],
      [sequelize.col("StudentParent.updated_at"), "updatedAt"],
    ],
  });

  studentParents.sort((a, b) => b.id - a.id);

  res.sendWrapped("List student and parent", httpStatus.OK, studentParents);
});

const updateStudentParentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;

  const validStudentParent = await findStudentParentByIdService({
    where: { id },
  });

  if (!validStudentParent)
    throw new BaseError(
      `Student parent with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  let validStudent;
  let validParent;

  if (requestBody.studentId) {
    validStudent = await findStudentByIdService({
      where: { id: requestBody.studentId },
    });

    if (!validStudent)
      throw new BaseError(
        `Student with ID ${requestBody.studentId} not found`,
        httpStatus.NOT_FOUND
      );
  }

  if (requestBody.parentId) {
    validParent = await findParentByIdService({
      where: { id: requestBody.parentId },
    });

    if (!validParent)
      throw new BaseError(
        `Parent with ID ${requestBody.parentId} not found`,
        httpStatus.NOT_FOUND
      );
  }

  const data = {
    student_id: validStudent?.id || validStudentParent.student_id,
    parent_id: validParent?.id || validStudentParent.parent_id,
  };

  const update = await updateStudentParentByIdService(data, { where: { id } });

  if (!update[0])
    throw new BaseError(
      `Update student parent with ID ${id} fail`,
      httpStatus.CONFLICT
    );

  res.sendWrapped(
    `Update student parent with ID ${id} successfully`,
    httpStatus.OK
  );
});

const deleteStudentParentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const validStudentParent = await findStudentParentByIdService({
    where: { id },
  });

  if (!validStudentParent)
    throw new BaseError(
      `Student parent with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  await StudentParent.destroy({ where: { id } });

  res.sendWrapped(
    `Delete student parent with ID ${id} successfully`,
    httpStatus.OK
  );
});

module.exports = {
  craeteStudentParentController,
  findStudentParentByIdController,
  findAllStudentParentController,
  updateStudentParentByIdController,
  deleteStudentParentByIdController,
};
