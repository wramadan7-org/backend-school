const { Router } = require("express");
const validate = require("../../middlewares/validate");
const {
  createParentController,
  findParentByIdController,
  findAllParentController,
  updateParentByIdController,
  deleteParentByIdController,
} = require("../../controllers/parentController");
const {
  createParentValidation,
  updateParentValidation,
} = require("../../validations/parentValidation");

const router = Router();

router.post("/", validate(createParentValidation), createParentController);
router.get("/:id", findParentByIdController);
router.get("/", findAllParentController);
router.patch(
  "/:id",
  validate(updateParentValidation),
  updateParentByIdController
);
router.delete("/:id", deleteParentByIdController);

module.exports = router;
