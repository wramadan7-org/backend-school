const httpStatus = require("http-status");
const BaseError = require("../exceptions/baseError");
const { sequelize } = require("../configs/config");
const catchAsync = require("../utils/catchAsync");
const {
  createParentService,
  findParentByIdService,
  findAllParentService,
  updateParentByIdService,
  deleteParentByIdService,
} = require("../services/parentService");
const { Op } = require("sequelize");
const { StudentParent, Parent, Student } = require("../models");

const createParentController = catchAsync(async (req, res) => {
  const requestBody = req.body;

  requestBody.firstName = requestBody.firstName.toUpperCase();
  requestBody.lastName = requestBody.lastName.toUpperCase();

  const parent = await createParentService(requestBody);

  res.sendWrapped("Create parrent successfully", httpStatus.CREATED, parent);
});

const findParentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const parent = await findParentByIdService({
    where: { id },
    include: { model: Student, as: "students" },
  });

  if (!parent)
    throw new BaseError(`Parent with ID ${id} not found`, httpStatus.NOT_FOUND);

  res.sendWrapped(`Parent with ID ${id}`, httpStatus.OK, parent);
});

const findAllParentController = catchAsync(async (req, res) => {
  const { search } = req.query;

  let parents;

  if (search) {
    parents = await findAllParentService({
      where: {
        [Op.or]: [
          {
            [Op.or]: [
              {
                firstName: sequelize.where(
                  // Column to search
                  sequelize.fn("LOWER", sequelize.col("Parent.first_name")),
                  // Search term in lowercase for case-insensitive search
                  { [Op.like]: `%${search.toLowerCase()}%` }
                ),
              },
              {
                lastName: sequelize.where(
                  // Column to search
                  sequelize.fn("LOWER", sequelize.col("Parent.last_name")),
                  // Search term in lowercase for case-insensitive search
                  { [Op.like]: `%${search.toLowerCase()}%` }
                ),
              },
              {
                phoneNumber: search,
              },
              {
                type: search,
              },
            ],
          },
        ],
      },
      include: { model: Student, as: "students" },
    });
  } else {
    parents = await findAllParentService({
      include: { model: Student, as: "students" },
    });
  }

  if (search && (!parents || !parents.length))
    throw new BaseError(
      `Parent with ${search} not found`,
      httpStatus.NOT_FOUND
    );

  parents.sort((a, b) => b.id - a.id);

  res.sendWrapped("List parent", httpStatus.OK, parents);
});

const updateParentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;

  if (requestBody.firstName) {
    requestBody.firstName = requestBody.firstName.toUpperCase();
  }

  if (requestBody.lastName) {
    requestBody.lastName = requestBody.lastName.toUpperCase();
  }

  const validParent = await findParentByIdService({ where: { id } });

  if (!validParent)
    throw new BaseError(`Parent with ID ${id} not found`, httpStatus.NOT_FOUND);

  const data = Object.assign(validParent, requestBody);

  const { dataValues } = data;

  const update = await updateParentByIdService(dataValues, { where: { id } });

  if (!update[0])
    throw new BaseError(
      `Fail to update parent with ID ${id}`,
      httpStatus.CONFLICT
    );

  res.sendWrapped("Update parent successfully", httpStatus.OK);
});

const deleteParentByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const validParent = await findParentByIdService({where: { id }});

  if (!validParent) throw new BaseError(`Parent with ID ${id} not found`, httpStatus.NOT_FOUND);

  await deleteParentByIdService({where: { id }});

  res.sendWrapped(`Delete parent with ID ${id} successfully`, httpStatus.OK);
});

module.exports = {
  createParentController,
  findParentByIdController,
  findAllParentController,
  updateParentByIdController,
  deleteParentByIdController,
};
