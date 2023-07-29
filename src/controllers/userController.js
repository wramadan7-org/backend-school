const httpStatus = require("http-status");
const { Op } = require("sequelize");
const BaseError = require("../exceptions/baseError");
const catchAsync = require("../utils/catchAsync");
const { UserDetail } = require("../models");
const {
  findUserByParamService,
  createUserService,
  findAllUserService,
  updateUserByParamService,
  deleteUserByParamService,
} = require("../services/userService");
const { encryptData } = require("../utils/crypto");

const createUserController = catchAsync(async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  // const validUser = await findUserByParamService({
  //   where: { [Op.or]: [{ username }, { email }] },
  // });

  // if (validUser)
  //   throw new BaseError(
  //     "Username or email already exists",
  //     httpStatus.CONFLICT
  //   );

  const encryptPassword = await encryptData(password);

  const data = {
    firstName,
    lastName,
    username,
    email,
    password: encryptPassword,
    role,
  };

  const user = await createUserService(data);

  res.sendWrapped("Create user successfully", httpStatus.CREATED, user);
});

const findOwnUserController = catchAsync(async (req, res) => {
  const { id } = req.user;

  const user = await findUserByParamService({
    where: { id },
    include: { model: UserDetail },
  });

  if (!user) throw new BaseError("User not found", httpStatus.NOT_FOUND);

  const result = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: user.password,
    role: user.role,
    userDetail: user.UserDetail || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res.sendWrapped("You're account", httpStatus.OK, result);
});

const findUserByParamController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await findUserByParamService({
    where: { id },
    include: { model: UserDetail },
  });

  if (!user) throw new BaseError("User not found", httpStatus.NOT_FOUND);

  const result = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: user.password,
    role: user.role,
    userDetail: user.UserDetail || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res.sendWrapped(`User with ID ${id}`, httpStatus.OK, result);
});

const findAllUserWithOptionalQueryController = catchAsync(async (req, res) => {
  const { search } = req.query;
  let users;

  if (search) {
    users = await findAllUserService({
      where: {
        [Op.or]: [{ id: search }, { username: search }, { email: search }],
      },
      include: { model: UserDetail },
    });
  } else {
    users = await findAllUserService({ include: { model: UserDetail } });
  }

  if (search && (!users || !users.length))
    throw new BaseError(`User with ${search} not found`, httpStatus.NOT_FOUND);

  const result = users.map((o) => {
    return {
      id: o.id,
      firstName: o.firstName,
      lastName: o.lastName,
      email: o.email,
      username: o.username,
      password: o.password,
      role: o.role,
      userDetail: o.UserDetail || null,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
    };
  }).sort((a, b) => b.id - a.id);

  res.sendWrapped("List user", httpStatus.OK, result);
});

const updateUserByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;

  const validUser = await findUserByParamService({ where: { id } });

  if (!validUser)
    throw new BaseError(`User with ID ${id} not found`, httpStatus.NOT_FOUND);

  const data = Object.assign(validUser, requestBody);

  const { dataValues } = data;

  const update = await updateUserByParamService(dataValues, { where: { id } });

  if (!update[0]) throw new BaseError("Fail to update user", httpStatus.CONFLICT);

  res.sendWrapped("Update successfully", httpStatus.OK, update);
});

const deleteUserByParamController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const validUser = await findUserByParamService({ where: { id } });

  if (!validUser)
    throw new BaseError(`User with ID ${id} not found`, httpStatus.NOT_FOUND);

  await deleteUserByParamService({ where: { id } });

  res.sendWrapped("Delete successfully", httpStatus.OK);
});

module.exports = {
  createUserController,
  findOwnUserController,
  findUserByParamController,
  findAllUserWithOptionalQueryController,
  updateUserByIdController,
  deleteUserByParamController,
};
