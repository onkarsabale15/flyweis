const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const userValidator = Joi.object({
  mobileNumber: Joi.string().required(),
  name: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  }).required(),
  email: Joi.string().email(),
  password: Joi.string().min(8).required(),
  dateOfBirth: Joi.date().max('now').required(),
  gender: Joi.string().required(),
  location: Joi.object({
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required()
  }).required(),
  matches: Joi.array().items(Joi.objectId()),
  wallet: Joi.objectId(),
  notifications: Joi.array().items(Joi.string())
}).required();

module.exports = userValidator;
