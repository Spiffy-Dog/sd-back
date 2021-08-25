const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const { sendMail } = require("./emailService");
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

const registration = async (body) => {
  const verifyToken = uuidv4();
  const { email } = body;
  const existEmail = await User.findOne({ email });

  if (existEmail) {
    throw new RegistrationConflictError("Email is already used");
  }
  const newUser = new User({ ...body, verifyToken });
  await newUser.save();

  await sendMail(verifyToken, email);

  return newUser;
  //   return logIn({ name, email, password });
};

const verification = async (token) => {
  const user = await User.findOne({ verifyToken: token });

  if (user) {
    await user.updateOne({ verify: true, verifyToken: null });
    return true;
  }
};

const reVerification = async (email) => {
  const user = await User.findOne({ email, verify: false });
  if (user) {
    await sendMail(user.verifyToken, email);
  }
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
  const { number, surName, deliveryAdress, dogName, dogBreed } =
    await User.findById(userId);
  return { number, surName, deliveryAdress, dogName, dogBreed };
};

const addUserInfo = async ({
  userId,
  number,
  surName,
  deliveryAdress,
  dogName,
  dogBreed,
}) => {
  await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        number,
        surName,
        deliveryAdress,
        dogName,
        dogBreed,
      },
    }
  );
};

module.exports = {
  registration,
  logIn,
  logOut,
  verification,
  reVerification,
  checkCurrentUser,
  getUserInfo,
  addUserInfo,
};
