const { Router } = require("express");
const validate = require("../../middlewares/validate");
const {
  createStudentController,
  findStudentByIdController,
  findAllStudentController,
  updateStudentByIdController,
  deleteStudentByIdController,
} = require("../../controllers/studentController");
const { createStudentValidation, updateStudentValidation } = require("../../validations/studentValidation");

const router = Router();

router.post("/", validate(createStudentValidation), createStudentController);
router.get("/:id", findStudentByIdController);
router.get("/", findAllStudentController);
router.patch("/:id", validate(updateStudentValidation), updateStudentByIdController);
router.delete("/:id", deleteStudentByIdController);

module.exports = router;
