const httpStatus = require("http-status");
const BaseError = require("../exceptions/baseError");
const { sequelize } = require("../configs/config");
const catchAsync = require("../utils/catchAsync");
const {
  createStudentService,
  findStudentByIdService,
  findAllStudentService,
  updateStudentByIdService,
  deleteStudentByIdService,
} = require("../services/studentService");
const { Op } = require("sequelize");
const { Parent } = require("../models");

const createStudentController = catchAsync(async (req, res) => {
  const { firstName, lastName, birthDate, gradeLevel, phoneNumber } = req.body;

  const data = {
    ...req.body,
    firstName: firstName.toUpperCase(),
    lastName: lastName.toUpperCase(),
  };

  const student = await createStudentService(data);

  res.sendWrapped("Create student successfully", httpStatus.CREATED, student);
});

const findStudentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const student = await findStudentByIdService({
    where: { id },
    include: { model: Parent, as: "parents" },
  });

  if (!student)
    throw new BaseError(
      `Student with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  res.sendWrapped(`Student with ID ${id}`, httpStatus.OK, student);
});

const findAllStudentController = catchAsync(async (req, res) => {
  const { search } = req.query;

  let students;

  if (search) {
    students = await findAllStudentService({
      where: {
        [Op.or]: [
          {
            [Op.or]: [
              {
                firstName: sequelize.where(
                  // Column to search
                  sequelize.fn("LOWER", sequelize.col("Student.first_name")),
                  // Search term in lowercase for case-insensitive search
                  { [Op.like]: `%${search.toLowerCase()}%` }
                ),
              },
              {
                lastName: sequelize.where(
                  // Column to search
                  sequelize.fn("LOWER", sequelize.col("Student.last_name")),
                  // Search term in lowercase for case-insensitive search
                  { [Op.like]: `%${search.toLowerCase()}%` }
                ),
              },
              {
                phoneNumber: search,
              },
              {
                gradeLevel: search,
              },
            ],
          },
        ],
      },
      include: { model: Parent, as: "parents" },
    });
  } else {
    students = await findAllStudentService({
      include: { model: Parent, as: "parents" },
    });
  }

  if (search && (!students || !students.length))
    throw new BaseError(
      `Student with ${search} not found`,
      httpStatus.NOT_FOUND
    );

  students.sort((a, b) => b.id - a.id);

  res.sendWrapped("List student", httpStatus.OK, students);
});

const updateStudentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;

  if (requestBody.firstName) {
    requestBody.firstName = requestBody.firstName.toUpperCase();
  }

  if (requestBody.lastName) {
    requestBody.lastName = requestBody.lastName.toUpperCase();
  }

  const validStudent = await findStudentByIdService({ where: { id } });

  if (!validStudent)
    throw new BaseError(
      `Student with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  const data = Object.assign(validStudent, requestBody);

  const { dataValues } = data;

  const update = await updateStudentByIdService(dataValues, { where: { id } });

  if (!update[0])
    throw new BaseError("Fail to update student", httpStatus.CONFLICT);

  res.sendWrapped("Update successfully", httpStatus.OK, dataValues);
});

const deleteStudentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const validStudent = await findStudentByIdService({ where: { id } });

  if (!validStudent)
    throw new BaseError(
      `Student with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  await deleteStudentByIdService({ where: { id } });

  res.sendWrapped("Delete successfully", httpStatus.OK);
});

module.exports = {
  createStudentController,
  findStudentByIdController,
  findAllStudentController,
  updateStudentByIdController,
  deleteStudentByIdController,
};
