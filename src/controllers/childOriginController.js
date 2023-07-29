const httpStatus = require("http-status");
const BaseError = require("../exceptions/baseError");
const catchAsync = require("../utils/catchAsync");
const {
  createChildOriginService,
  findAllChildOriginService,
  findChildOriginByParamService,
  updateChildOriginByParamService,
  deleteChildOriginByParamService,
} = require("../services/childOriginService");
const { findStudentByIdService } = require("../services/studentService");
const { Student, Parent } = require("../models");

const createChildOriginController = catchAsync(async (req, res) => {
  const requestBody = req.body;

  const validStudent = await findStudentByIdService({
    where: { id: requestBody.studentId },
  });

  if (!validStudent)
    throw new BaseError(
      `Student with ID ${requestBody.studentId} not found`,
      httpStatus.NOT_FOUND
    );

  requestBody.enterAs = requestBody.enterAs.toUpperCase();
  requestBody.nameSchool = requestBody.nameSchool.toUpperCase();

  const childOrigin = await createChildOriginService(requestBody);

  res.sendWrapped(
    "Create child origin successfully",
    httpStatus.CREATED,
    childOrigin
  );
});

const findAllChildOriginController = catchAsync(async (req, res) => {
  const childOrigins = await findAllChildOriginService({
    include: {
      model: Student,
      as: "student",
      include: { model: Parent, as: "parents" },
    },
  });

  res.sendWrapped("List child origin", httpStatus.OK, childOrigins);
});

const findChildOriginByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const childOrigin = await findChildOriginByParamService({ where: { id } });

  if (!childOrigin)
    throw new BaseError(
      `Child origin with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  res.sendWrapped(`Child origin with ID ${id}`, httpStatus.OK, childOrigin);
});

const updateChildOriginByParamController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;

  if (requestBody.enterAs) {
    requestBody.enterAs = requestBody.enterAs.toUpperCase();
  }

  if (requestBody.nameSchool) {
    requestBody.nameSchool = requestBody.nameSchool.toUpperCase();
  }

  const validChildOrigin = await findChildOriginByParamService({
    where: { id },
  });

  if (!validChildOrigin)
    throw new BaseError(
      `Child origin with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  const data = Object.assign(validChildOrigin, requestBody);
  const { dataValues } = data;

  const update = await updateChildOriginByParamService(dataValues, {
    where: { id },
  });

  if (!update[0])
    throw new BaseError(
      `Fail to update child origin with ID ${id}`,
      httpStatus.CONFLICT
    );

  res.sendWrapped(
    `Update child origin with ID ${id} successfully`,
    httpStatus.OK
  );
});

const deleteChildOriginByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const validChildOrigin = await findChildOriginByParamService({
    where: { id },
  });

  if (!validChildOrigin)
    throw new BaseError(
      `Child origin with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  await deleteChildOriginByParamService({ where: { id } });

  res.sendWrapped(
    `Delete child origin with ID ${id} successfully`,
    httpStatus.OK
  );
});

module.exports = {
  createChildOriginController,
  findAllChildOriginController,
  findChildOriginByIdController,
  updateChildOriginByParamController,
  deleteChildOriginByIdController,
};
