const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Введите корректный email.",
      "any.required": "Email обязателен для регистрации.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Пароль должен содержать не менее 6 символов.",
      "any.required": "Пароль обязателен для регистрации.",
    }),
    isAnonymous: Joi.boolean().messages({
      "boolean.base": "Поле 'isAnonymous' должно быть логическим значением.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Введите корректный email.",
      "any.required": "Email обязателен для входа.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Пароль должен содержать не менее 6 символов.",
      "any.required": "Пароль обязателен для входа.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { registerValidation, loginValidation };
