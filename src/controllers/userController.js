const {
  registration,
  logIn,
  logOut,
  verification,
  reVerification,
  checkCurrentUser,
  getUserInfo,
  addUserInfo,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const newUser = await registration(req.body);
  res.status(201).json({ newUser });
};

const logInController = async (req, res) => {
  const { email, password } = req.body;
  const user = await logIn({ email, password });
  res.status(200).json({ user });
};

const logOutController = async (req, res) => {
  const { userId } = req;
  await logOut(userId);
  res.status(204).json({ message: "No content" });
};

const currentUserController = async (req, res) => {
  const { token } = req;
  const currentUser = checkCurrentUser(token);

  res.status(200).json({ status: "success", currentUser });
};

const verifyUserController = async (req, res) => {
  const result = await verification(req.params.verifyToken);
  if (result) {
    return res.status(200).json({ message: "Verification succesfull" });
  }
  res.status(400).json({ message: "Verification token is invalid" });
};

const reVerifyUserController = async (req, res) => {
  const result = await reVerification(req.body.email);
  if (result) {
    return res.status(200).json({ message: "Verification email was sent" });
  }
  res.status(400).json({ message: "Verification has already been passed" });
};

const getUserInfoController = async (req, res) => {
  const { userId } = req;
  const userInfo = await getUserInfo(userId);
  res.status(200).json({ status: "success", userInfo });
};

const addUserInfoController = async (req, res) => {
  const { userId } = req;
  const { number, surName, deliveryAdress, dogName, dogBreed } =
    req.body;
  await addUserInfo({
    userId,
    number,
    surName,
    deliveryAdress,
    dogName,
    dogBreed,
  });
  res.status(200).json({ status: "success", message: "User's data was added" });
};

module.exports = {
  registrationController,
  logInController,
  logOutController,
  currentUserController,
  verifyUserController,
  reVerifyUserController,
  getUserInfoController,
  addUserInfoController,
};
