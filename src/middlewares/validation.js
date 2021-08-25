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

const userInfoValidation = (req, res, next) => {
  const schema = Joi.object({
    surname: Joi.string().min(3).max(16).required(),
    number: Joi.string().min(10).max(13).required(),
    deliveryAdress: Joi.string().min(15).max(50).required(),
    dogName: Joi.string().min(2).max(15).required(),
    dogBreed: Joi.string().min(3).max(30).required(),
  });
  checkValidation(schema, req, res, next);
};

const addUserInfoValidation = (req, res, next) => {
  const schema = Joi.object({
    surname: Joi.string().min(3).max(16).required(),
    number: Joi.string().min(10).max(13).required(),
    deliveryAdress: Joi.string().min(15).max(50).required(),
    dogName: Joi.string().min(2).max(15).required(),
    dogBreed: Joi.string().min(3).max(30).required(),
  });
  checkValidation(schema, req, res, next);
};

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
  userInfoValidation,
  addUserInfoValidation,
  userLoginValidation,
};
