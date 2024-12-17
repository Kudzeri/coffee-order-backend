const Joi = require("joi");

const createOrderValidation = (data) => {
  const schema = Joi.object({
    user: Joi.string().required().messages({
      "string.base": "Идентификатор пользователя должен быть строкой.",
      "any.required": "Идентификатор пользователя обязателен.",
    }),
    products: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().required().messages({
            "string.base": "Идентификатор продукта должен быть строкой.",
            "any.required": "Идентификатор продукта обязателен.",
          }),
          quantity: Joi.number().integer().min(1).required().messages({
            "number.base": "Количество должно быть числом.",
            "number.integer": "Количество должно быть целым числом.",
            "number.min": "Количество должно быть не менее 1.",
            "any.required": "Количество обязательно.",
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        "array.base": "Продукты должны быть массивом.",
        "array.min": "Должен быть указан как минимум один продукт.",
        "any.required": "Продукты обязательны.",
      }),
    supplements: Joi.array()
      .items(
        Joi.object({
          supplement: Joi.string().required().messages({
            "string.base": "Идентификатор добавки должен быть строкой.",
            "any.required": "Идентификатор добавки обязателен.",
          }),
          quantity: Joi.number().integer().min(1).required().messages({
            "number.base": "Количество должно быть числом.",
            "number.integer": "Количество должно быть целым числом.",
            "number.min": "Количество должно быть не менее 1.",
            "any.required": "Количество обязательно.",
          }),
        })
      )
      .messages({
        "array.base": "Добавки должны быть массивом.",
      }),
    totalPrice: Joi.number().positive().required().messages({
      "number.base": "Общая стоимость должна быть числом.",
      "number.positive": "Общая стоимость должна быть положительным числом.",
      "any.required": "Общая стоимость обязательна.",
    }),
    paymentMethod: Joi.string()
      .valid("cash", "card", "online")
      .required()
      .messages({
        "string.base": "Метод оплаты должен быть строкой.",
        "any.only":
          "Метод оплаты может быть только 'cash', 'card' или 'online'.",
        "any.required": "Метод оплаты обязателен.",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { createOrderValidation };
