const Joi = require("joi");

const pwdCheck =
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|(?=.*[A-Z])(?=.*[0-9]))(?=.{6,})/;

const pwdCheckError =
  "Пароль должен содержать минимум 6 символов, включая числа";

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.message.includes("password")
        ? "Password should contain 6 characters with numbers and latin letters"
        : validationResult.error.message,
    });
  }
  next();
};

const userRegistrationValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(14).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ru", "org", "ua", "gov"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp(pwdCheck), pwdCheckError)
      .required(),
  });
  checkValidation(schema, req, res, next);
};

// const userInfoValidation = (req, res, next) => {
//   const schema = Joi.object({
//     height: Joi.string().min(2).max(3).required(),
//     weight: Joi.string().min(2).max(3).required(),
//     age: Joi.string().min(2).max(3).required(),
//     desiredWeight: Joi.string().min(2).max(3).required(),
//     bloodGroup: Joi.string().min(1).max(1).required(),
//     productsNotAllowed: Joi.array(),
//   });
//   checkValidation(schema, req, res, next);
// };

// const addUserInfoValidation = (req, res, next) => {
//   const schema = Joi.object({
//     height: Joi.string().min(2).max(3).required(),
//     weight: Joi.string().min(2).max(3).required(),
//     age: Joi.string().min(2).max(3).required(),
//     desiredWeight: Joi.string().min(2).max(3).required(),
//     bloodGroup: Joi.string().min(1).max(1).required(),
//     productsNotAllowed: Joi.array().required(),
//   });
//   checkValidation(schema, req, res, next);
// };

const userLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(14).required(),
    password: Joi.string()
      .pattern(new RegExp(pwdCheck), pwdCheckError)
      .required(),
  });
  checkValidation(schema, req, res, next);
};

module.exports = {
  userRegistrationValidation,
  //   userInfoValidation,
  userLoginValidation,
};
