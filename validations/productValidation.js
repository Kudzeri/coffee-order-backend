const Joi = require("joi");

const createProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Название продукта должно быть строкой.",
      "string.min": "Название продукта должно содержать не менее 3 символов.",
      "string.max": "Название продукта не может превышать 100 символов.",
      "any.required": "Название продукта обязательно.",
    }),
    slug: Joi.string().min(3).max(100).required().messages({
      "string.base": "Slug продукта должен быть строкой.",
      "string.min": "Slug продукта должен содержать не менее 3 символов.",
      "string.max": "Slug продукта не может превышать 100 символов.",
      "any.required": "Slug продукта обязателен.",
    }),
    image: Joi.string().uri().required().messages({
      "string.base": "Изображение продукта должно быть строкой.",
      "string.uri": "Изображение должно быть действительным URL.",
      "any.required": "Изображение продукта обязательно.",
    }),
    category: Joi.string().hex().length(24).required().messages({
      "string.base": "Категория продукта должна быть строкой.",
      "string.hex": "Категория должна быть в формате Hex.",
      "string.length": "Категория должна быть длиной 24 символа.",
      "any.required": "Категория продукта обязательна.",
    }),
    description: Joi.string().min(10).max(500).required().messages({
      "string.base": "Описание продукта должно быть строкой.",
      "string.min": "Описание продукта должно содержать не менее 10 символов.",
      "string.max": "Описание продукта не может превышать 500 символов.",
      "any.required": "Описание продукта обязательно.",
    }),
    supplements: Joi.array().items(Joi.string().hex().length(24)).messages({
      "array.base": "Добавки должны быть массивом.",
      "string.hex": "Каждая добавка должна быть в формате Hex.",
      "string.length": "Каждая добавка должна быть длиной 24 символа.",
    }),
    price: Joi.number().positive().precision(2).required().messages({
      "number.base": "Цена продукта должна быть числом.",
      "number.positive": "Цена продукта должна быть положительным числом.",
      "number.precision": "Цена продукта должна иметь не более двух десятичных знаков.",
      "any.required": "Цена продукта обязательна.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const updateProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).messages({
      "string.base": "Название продукта должно быть строкой.",
      "string.min": "Название продукта должно содержать не менее 3 символов.",
      "string.max": "Название продукта не может превышать 100 символов.",
    }),
    slug: Joi.string().min(3).max(100).messages({
      "string.base": "Slug продукта должен быть строкой.",
      "string.min": "Slug продукта должен содержать не менее 3 символов.",
      "string.max": "Slug продукта не может превышать 100 символов.",
    }),
    image: Joi.string().uri().messages({
      "string.base": "Изображение продукта должно быть строкой.",
      "string.uri": "Изображение должно быть действительным URL.",
    }),
    category: Joi.string().hex().length(24).messages({
      "string.base": "Категория продукта должна быть строкой.",
      "string.hex": "Категория должна быть в формате Hex.",
      "string.length": "Категория должна быть длиной 24 символа.",
    }),
    description: Joi.string().min(10).max(500).messages({
      "string.base": "Описание продукта должно быть строкой.",
      "string.min": "Описание продукта должно содержать не менее 10 символов.",
      "string.max": "Описание продукта не может превышать 500 символов.",
    }),
    supplements: Joi.array().items(Joi.string().hex().length(24)).messages({
      "array.base": "Добавки должны быть массивом.",
      "string.hex": "Каждая добавка должна быть в формате Hex.",
      "string.length": "Каждая добавка должна быть длиной 24 символа.",
    }),
    price: Joi.number().positive().precision(2).messages({
      "number.base": "Цена продукта должна быть числом.",
      "number.positive": "Цена продукта должна быть положительным числом.",
      "number.precision": "Цена продукта должна иметь не более двух десятичных знаков.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { createProductValidation, updateProductValidation };
