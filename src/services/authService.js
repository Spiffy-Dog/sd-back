const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = reqiure("uuid");
const { sendEmail } = require("./emailService");
const { User } = require("../db/userModel");
const {
  NotAuthorizedError,
  RegistrationConflictError,
} = require("../helpers/errors");

const logIn = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.validPassword(password)) || !user.verify) {
    throw new NotAuthorizedError(`Wrong password or login`);
  }

  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET
  );

  await User.findByIdAndUpdate(user._id, { $set: { token } }, { new: true });
  return { token, email };
};

const registration = async ({ name, email, password }) => {
  const existEmail = await User.findOne({ email });

  if (existEmail) {
    throw new RegistrationConflictError("Email is already used");
  }
  const user = new User({
    name,
    email,
    password,
  });
  await user.save();

  await sendEmail(name, email);

  return logIn({ name, email, password });
};

const logOut = async (userId) => {
  const logoutUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { token: null } },
    { new: true }
  );

  if (!logoutUser) {
    throw new NotAuthorizedError("Not authorized");
  }

  return logoutUser;
};

const checkCurrentUser = async (token) => {
  const user = await User.findOne({ token }).select({
    password: 0,
    __v: 0,
    _id: 0,
  });

  return user;
};

const getUserInfo = async (userId) => {
  const { height, weight, age, desiredWeight, bloodGroup, productsNotAllowed } =
    await User.findById(userId);
  return { height, weight, age, desiredWeight, bloodGroup, productsNotAllowed };
};

const addUserInfo = async ({
  userId,
  height,
  weight,
  desiredWeight,
  bloodGroup,
  age,
  productsNotAllowed,
}) => {
  await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        height,
        weight,
        desiredWeight,
        bloodGroup,
        age,
        productsNotAllowed,
      },
    }
  );
};

module.exports = {
  registration,
  logIn,
  logOut,
  checkCurrentUser,
  getUserInfo,
  addUserInfo,
};
