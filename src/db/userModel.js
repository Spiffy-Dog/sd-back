const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for user"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Set email for user"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  surname: {
    type: String,
    default: null,
  },
  number: {
    type: String,
    default: null,
  },
  deliveryAdress: {
    type: String,
    default: null,
  },
  dogName: {
    type: String,
    default: null,
  },
  dogBreed: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, "Verify is required"],
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
  }
});

userSchema.methods.validPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

// userSchema.path("email").validate(function (value) {
//   const regex =
//     /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
//   return regex.test(String(value).toLowerCase());
// });

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};
