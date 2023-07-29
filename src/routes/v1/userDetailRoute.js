const { Router } = require("express");
const auth = require("../../middlewares/auth");
const { createUserDetailController, findOwnUserDetailController, findUserDetailByParamController, findAllUserDetailWithOptionalQueryController, updateUserDetailByIdController, deleteUserDetailByIdController } = require("../../controllers/userDetailController");

const router = Router();

router.post("/", auth, createUserDetailController);
router.get("/own", auth, findOwnUserDetailController);
router.get("/:id", findUserDetailByParamController);
router.get("/", findAllUserDetailWithOptionalQueryController);
router.patch("/:id", updateUserDetailByIdController);
router.delete("/:id", deleteUserDetailByIdController);

module.exports = router;