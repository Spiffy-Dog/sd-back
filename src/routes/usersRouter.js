const express = require("express");
const router = express.Router();

const {
  userRegistrationValidation,
  userLoginValidation,
  addUserInfoValidation,
} = require("../middlewares/validation");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  registrationController,
  logInController,
  logOutController,
  currentUserController,
  verifyUserController,
  reVerifyUserController,
  getUserInfoController,
  addUserInfoController,
} = require("../controllers/userController");

router.post(
  "/registration",
  userRegistrationValidation,
  asyncWrapper(registrationController)
);
router.post("/login", userLoginValidation, asyncWrapper(logInController));
router.get("/verify/:verifyToken", asyncWrapper(verifyUserController));
router.post("/verify", asyncWrapper(reVerifyUserController));
router.use(authMiddleware);
router.post("/logout", asyncWrapper(logOutController));
router.get("/current", asyncWrapper(currentUserController));
router.get("/info", asyncWrapper(getUserInfoController));
router.post(
  "/info",
  addUserInfoValidation,
  asyncWrapper(addUserInfoController)
);

module.exports = router;
