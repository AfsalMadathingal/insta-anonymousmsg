const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(4).required().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must have at least {#limit} characters',
    'any.required': 'Username is required',
  }),
  password: Joi.string().min(4).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must have at least {#limit} characters',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm Password is required',
  })
}).with('password', 'confirmPassword');

function validateUser(data) {
  const { error } = userSchema.validate(data, { abortEarly: false });
  return error ? error.details.map(err => err.message) : null;
}


const loginSchema = Joi.object({
    username: Joi.string().min(4).required().messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username cannot be empty',
      'string.min': 'Username must have at least {#limit} characters',
      'any.required': 'Username is required',
    }),
    password: Joi.string().min(4).required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must have at least {#limit} characters',
      'any.required': 'Password is required',
    }),
  }).with('username', 'password');



function validateLogin(data) {
  const { error } = loginSchema.validate(data, { abortEarly: false });
  return error ? error.details.map(err => err.message) : null;
}




module.exports = {
  validateUser,
  validateLogin
};
