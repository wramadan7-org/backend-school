const { Router } = require("express");
const {
  createChildOriginController,
  findAllChildOriginController,
  findChildOriginByIdController,
  updateChildOriginByParamController,
  deleteChildOriginByIdController,
} = require("../../controllers/childOriginController");
const validate = require("../../middlewares/validate");
const { createChildOriginValidation, updateChildOriginValidation } = require("../../validations/childOriginValidation");

const router = Router();

router.post("/", validate(createChildOriginValidation), createChildOriginController);
router.get("/", findAllChildOriginController);
router.get("/:id", findChildOriginByIdController);
router.patch("/:id", validate(updateChildOriginValidation), updateChildOriginByParamController);
router.delete("/:id", deleteChildOriginByIdController);

module.exports = router;
