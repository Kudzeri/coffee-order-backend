const Joi = require("joi");

// Валидация создания добавки
const createSupplementValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Название добавки должно быть строкой.",
      "string.min": "Название добавки должно содержать не менее 3 символов.",
      "string.max": "Название добавки не может превышать 100 символов.",
      "any.required": "Название добавки обязательно.",
    }),
    description: Joi.string().min(10).max(500).required().messages({
      "string.base": "Описание добавки должно быть строкой.",
      "string.min": "Описание добавки должно содержать не менее 10 символов.",
      "string.max": "Описание добавки не может превышать 500 символов.",
      "any.required": "Описание добавки обязательно.",
    }),
    price: Joi.number().positive().precision(2).required().messages({
      "number.base": "Цена добавки должна быть числом.",
      "number.positive": "Цена добавки должна быть положительным числом.",
      "number.precision":
        "Цена добавки должна иметь не более двух десятичных знаков.",
      "any.required": "Цена добавки обязательна.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

// Валидация обновления добавки
const updateSupplementValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).messages({
      "string.base": "Название добавки должно быть строкой.",
      "string.min": "Название добавки должно содержать не менее 3 символов.",
      "string.max": "Название добавки не может превышать 100 символов.",
    }),
    description: Joi.string().min(10).max(500).messages({
      "string.base": "Описание добавки должно быть строкой.",
      "string.min": "Описание добавки должно содержать не менее 10 символов.",
      "string.max": "Описание добавки не может превышать 500 символов.",
    }),
    price: Joi.number().positive().precision(2).messages({
      "number.base": "Цена добавки должна быть числом.",
      "number.positive": "Цена добавки должна быть положительным числом.",
      "number.precision":
        "Цена добавки должна иметь не более двух десятичных знаков.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { createSupplementValidation, updateSupplementValidation };
