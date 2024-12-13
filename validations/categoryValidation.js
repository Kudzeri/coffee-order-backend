const Joi = require("joi");

const createCategoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Имя категории должно быть строкой.",
      "string.min": "Имя категории должно содержать не менее 3 символов.",
      "string.max": "Имя категории не может превышать 100 символов.",
      "any.required": "Имя категории обязательно.",
    }),
    description: Joi.string().max(500).messages({
      "string.base": "Описание категории должно быть строкой.",
      "string.max": "Описание категории не может превышать 500 символов.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const updateCategoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).messages({
      "string.base": "Имя категории должно быть строкой.",
      "string.min": "Имя категории должно содержать не менее 3 символов.",
      "string.max": "Имя категории не может превышать 100 символов.",
    }),
    description: Joi.string().max(500).messages({
      "string.base": "Описание категории должно быть строкой.",
      "string.max": "Описание категории не может превышать 500 символов.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { createCategoryValidation, updateCategoryValidation };
