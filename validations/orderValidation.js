const Joi = require("joi");

const orderValidation = (data) => {
  const schema = Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required().messages({
            "string.required": "Product ID обязателен.",
          }),
          quantity: Joi.number().integer().min(1).required().messages({
            "number.min": "Количество продукта должно быть больше нуля.",
            "any.required": "Количество продукта обязательно.",
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        "array.min": "Необходимо указать хотя бы один продукт.",
        "any.required": "Список продуктов обязателен.",
      }),

    supplements: Joi.array()
      .items(Joi.string().required())
      .messages({
        "string.required": "ID добавки обязательно.",
      }),

    totalPrice: Joi.number()
      .min(0)
      .required()
      .messages({
        "number.min": "Общая сумма не может быть отрицательной.",
        "any.required": "Общая сумма обязательна для заказа.",
      }),

    orderDate: Joi.date()
      .required()
      .messages({
        "any.required": "Дата заказа обязательна.",
        "date.base": "Дата заказа должна быть в правильном формате.",
      }),

    userId: Joi.string()
      .optional()
      .messages({
        "string.base": "ID пользователя должно быть строкой.",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { orderValidation };
