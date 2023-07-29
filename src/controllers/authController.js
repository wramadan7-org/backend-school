const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const BaseError = require("../exceptions/baseError");
const { User, UserDetail } = require("../models");
const { jwtSign, jwtVerify } = require("../utils/jwt");
const { encryptData, decryptData } = require("../utils/crypto");
const { findUserByParamService } = require("../services/userService");
const { registerService } = require("../services/authService");
const { Op } = require("sequelize");

const loginController = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const validUser = await findUserByParamService({
    where: { [Op.or]: [{ username }, { email: username }] },
  });

  if (!validUser) throw new BaseError("Username invalid", httpStatus.CONFLICT);

  const decryptPassword = await decryptData(validUser.password);

  if (password !== decryptPassword)
    throw new BaseError("Password invalid", httpStatus.UNAUTHORIZED);

  const data = {
    id: validUser.id,
    firstName: validUser.firstName,
    lastName: validUser.lastName,
    username,
    role: validUser.role,
  };

  const token = await jwtSign(data);

  const encrypt = await encryptData(token);

  const result = {
    token: encrypt,
  };

  res.sendWrapped("Login successfully", httpStatus.OK, result);
});

const registerController = catchAsync(async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  const validUsername = await findUserByParamService({
    where: { [Op.or]: [{ username }, { email }] },
  });

  if (validUsername)
    throw new BaseError(
      "Username or email already exists",
      httpStatus.CONFLICT
    );

  const encryptPassword = await encryptData(password);

  const data = {
    firstName,
    lastName,
    username,
    email,
    password: encryptPassword,
    role,
  };

  const register = await registerService(data);

  res.sendWrapped("Register successfully", httpStatus.CREATED, register);
});

module.exports = {
  loginController,
  registerController,
};
