const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .when("isAnonymous", {
        is: false,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      })
      .messages({
        "string.email": "Введите корректный email.",
        "any.required": "Email обязателен для регистрации.",
        "any.unknown": "Email не требуется для анонимной регистрации.",
      }),
    password: Joi.string()
      .min(6)
      .when("isAnonymous", {
        is: false,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      })
      .messages({
        "string.min": "Пароль должен содержать не менее 6 символов.",
        "any.required": "Пароль обязателен для регистрации.",
        "any.unknown": "Пароль не требуется для анонимной регистрации.",
      }),
    isAnonymous: Joi.boolean().messages({
      "boolean.base": "Поле 'isAnonymous' должно быть логическим значением.",
      "any.required": "Поле 'isAnonymous' обязательно для регистрации.",
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

const editUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).messages({
      "string.min": "Имя должно содержать не менее 3 символов.",
    }),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).messages({
      "string.pattern.base": "Введите корректный номер телефона."
    }),
    email: Joi.string().email().messages({
      "string.email": "Введите корректный email."
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const changePasswordValidation = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required().messages({
      "any.required": "Текущий пароль обязателен."
    }),
    newPassword: Joi.string().min(6).required().messages({
      "string.min": "Новый пароль должен содержать не менее 6 символов.",
      "any.required": "Новый пароль обязателен."
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { registerValidation, loginValidation, editUserValidation, changePasswordValidation };
