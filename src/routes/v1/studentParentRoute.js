const { Router } = require("express");
const validate = require("../../middlewares/validate");
const {
  craeteStudentParentController,
  findStudentParentByIdController,
  findAllStudentParentController,
  updateStudentParentByIdController,
  deleteStudentParentByIdController,
} = require("../../controllers/studentParentController");
const {
  createStudentParentValidation,
  updateStudentParentValidation,
} = require("../../validations/studentParentValidation");

const router = Router();

router.post(
  "/",
  validate(createStudentParentValidation),
  craeteStudentParentController
);
router.get("/:id", findStudentParentByIdController);
router.get("/", findAllStudentParentController);
router.patch(
  "/:id",
  validate(updateStudentParentValidation),
  updateStudentParentByIdController
);
router.delete("/:id", deleteStudentParentByIdController);

module.exports = router;
