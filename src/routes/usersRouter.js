const express = require("express");
const router = express.Router();

// const {
//     userRegistrationValidation,
//     userLoginValidation,
//     addUserInfoValidation
// } = require("../middlewares/validation");
// const { asyncWrapper } = require("../helpers/apiHelpers");
// const { authMiddleware } = require("../middlewares/authMiddleware");

// const {
//     registrationController,
//     logInController,
//     logOutController,
//     currentUserController,
//     getUserInfoController,
//     addUserInfoController
// } = require("../controllers/usersController");

// router.post(
//     "/registration",
//     userRegistrationValidation,
//     asyncWrapper(registrationController)
// );
// router.post("/login", userLoginValidation, asyncWrapper(logInController));
// router.use(authMiddleware);
// router.post("/logout", asyncWrapper(logOutController));
// router.get("/current", asyncWrapper(currentUserController));
// router.get("/info", asyncWrapper(getUserInfoController));
// router.post("/info", addUserInfoValidation, asyncWrapper(addUserInfoController))

module.exports = router;