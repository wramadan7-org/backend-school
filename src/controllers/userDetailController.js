const httpStatus = require("http-status");
const BaseError = require("../exceptions/baseError");
const {
  createUserDetailService,
  findUserDetailByParamService,
  findAllUserDetailService,
  updateUserDetailByParamService,
  deleteUserDetailByParamService,
} = require("../services/userDetailService");
const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");
const { User } = require("../models");

const createUserDetailController = catchAsync(async (req, res) => {
  const { phoneNumber, nik, birthDate, address } = req.body;
  const { id } = req.user;

  const data = {
    userId: id,
    phoneNumber,
    nik,
    birthDate,
    address,
  };

  // const alredyExists = await findUserDetailByParamService({
  //   where: { [Op.or]: [{ userId: id }, { nik }] },
  // });

  // if (alredyExists)
  //   throw new BaseError(
  //     "You're account or NIK already exists",
  //     httpStatus.CONFLICT
  //   );

  const userDetail = await createUserDetailService(data);

  res.sendWrapped(
    "Create user detail successfully",
    httpStatus.CREATED,
    userDetail
  );
});

const findOwnUserDetailController = catchAsync(async (req, res) => {
  const { id } = req.user;

  const userDetail = await findUserDetailByParamService({
    where: { userId: id },
    include: { model: User },
  });

  if (!userDetail)
    throw new BaseError(
      "You're don't have detail account, please create your detail first",
      httpStatus.NOT_FOUND
    );

  const result = {
    id: userDetail.id,
    userId: userDetail.userId,
    phoneNumber: userDetail.phoneNumber,
    nik: userDetail.nik,
    birthDate: userDetail.birthDate,
    address: userDetail.address,
    user: userDetail.User || null,
    createdAt: userDetail.createdAt,
    updatedAt: userDetail.updatedAt,
  };

  res.sendWrapped("Your detail account", httpStatus.OK, userDetail);
});

const findUserDetailByParamController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const userDetail = await findUserDetailByParamService({
    where: { id },
    include: { model: User },
  });

  if (!userDetail)
    throw new BaseError(
      `Detail account with id ${id} not found`,
      httpStatus.NOT_FOUND
    );

  const result = {
    id: userDetail.id,
    userId: userDetail.userId,
    phoneNumber: userDetail.phoneNumber,
    nik: userDetail.nik,
    birthDate: userDetail.birthDate,
    address: userDetail.address,
    user: userDetail.User || null,
    createdAt: userDetail.createdAt,
    updatedAt: userDetail.updatedAt,
  };

  res.sendWrapped(`Detail account with ID ${id}`, httpStatus.OK, result);
});

const findAllUserDetailWithOptionalQueryController = catchAsync(
  async (req, res) => {
    const { search } = req.query;
    let userDetails;

    if (search) {
      userDetails = await findAllUserDetailService({
        where: {
          [Op.or]: [
            { userId: search },
            { phoneNumber: search },
            { nik: search },
          ],
        },
        include: { model: User },
      });
    } else {
      userDetails = await findAllUserDetailService({
        include: { model: User },
      });
    }

    if (search && (!userDetails || !userDetails.length))
      throw new BaseError(
        `Detail account with ${search} not found`,
        httpStatus.NOT_FOUND
      );

    const result = userDetails.map((o) => {
      return {
        id: o.id,
        userId: o.userId,
        phoneNumber: o.phoneNumber,
        nik: o.nik,
        birthDate: o.birthDate,
        address: o.address,
        user: o.User || null,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
      };
    }).sort((a, b) => b.id - a.id);

    res.sendWrapped("List detail account", httpStatus.OK, result);
  }
);

const updateUserDetailByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;

  const validUserDetail = await findUserDetailByParamService({ where: { id } });

  if (!validUserDetail)
    throw new BaseError(
      `Detail account with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  const data = Object.assign(validUserDetail, requestBody);

  const { dataValues } = data;

  const update = await updateUserDetailByParamService(dataValues, { where: { id } });

  if (!update[0]) throw new BaseError("Fail to update user detail", httpStatus.CONFLICT);

  res.sendWrapped("Update successfully", httpStatus.OK, update);
});

const deleteUserDetailByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const validUserDetail = await findUserDetailByParamService({ where: { id } });

  if (!validUserDetail)
    throw new BaseError(
      `Detail account with ID ${id} not found`,
      httpStatus.NOT_FOUND
    );

  await deleteUserDetailByParamService({ where: { id } });

  res.sendWrapped("Delete successfully", httpStatus.OK);
});

module.exports = {
  createUserDetailController,
  findOwnUserDetailController,
  findUserDetailByParamController,
  findAllUserDetailWithOptionalQueryController,
  updateUserDetailByIdController,
  deleteUserDetailByIdController,
};
