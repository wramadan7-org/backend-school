const { Router } = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const {
  createUserValidation,
  updateUserValidation,
} = require("../../validations/userValidation");
const {
  createUserController,
  findOwnUserController,
  findUserByParamController,
  findAllUserWithOptionalQueryController,
  updateUserByIdController,
  deleteUserByParamController,
} = require("../../controllers/userController");

const router = Router();

router.post("/", auth, validate(createUserValidation), createUserController);
router.get("/own", auth, findOwnUserController);
router.get("/:id", findUserByParamController);
router.get("/", findAllUserWithOptionalQueryController);
router.patch("/:id", validate(updateUserValidation), updateUserByIdController);
router.delete("/:id", deleteUserByParamController);

module.exports = router;
