const { Router } = require("express");
const { loginController, registerController } = require("../../controllers/authController");
const validate = require("../../middlewares/validate");
const {
  loginValidation,
  registerValidation,
} = require("../../validations/authValidation");

const router = Router();

router.post("/login", validate(loginValidation), loginController);
router.post("/register", validate(registerValidation), registerController);

module.exports = router;
