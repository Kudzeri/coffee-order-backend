const Order = require("../models/Order");
const { sendError, sendServerError } = require("../utils/errorHandler");
const {
  createOrderValidation,
  updateOrderValidation,
} = require("../validations/orderValidation");

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user products.product supplements.supplement");

    if (!order) {
      return sendError(res, 404, "Заказ не найден.");
    }

    res.status(200).json({ order });
  } catch (err) {
    return sendServerError(res, "Ошибка получения заказа:", err);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
      .populate("user products.product supplements.supplement");

    res.status(200).json({ orders });
  } catch (err) {
    return sendServerError(res, "Ошибка получения заказов:", err);
  }
};

const createOrder = async (req, res) => {
  try {
    const { user, products, supplements, totalPrice, status, paymentMethod } =
      req.body;

    const { error } = createOrderValidation(req.body);
    if (error) {
      return sendError(
        res,
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    const order = new Order({
      user,
      products,
      supplements,
      totalPrice,
      status,
      paymentMethod,
    });

    await order.save();

    res.status(201).json({ message: "Заказ успешно создан.", order });
  } catch (err) {
    return sendServerError(res, "Ошибка создания заказа:", err);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, products, supplements, totalPrice, status, paymentMethod } =
      req.body;

    const { error } = updateOrderValidation(req.body);
    if (error) {
      return sendError(
        res,
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    const order = await Order.findById(id);
    if (!order) {
      return sendError(res, 404, "Заказ не найден.");
    }

    if (user) order.user = user;
    if (products) order.products = products;
    if (supplements) order.supplements = supplements;
    if (totalPrice) order.totalPrice = totalPrice;
    if (status) order.status = status;
    if (paymentMethod) order.paymentMethod = paymentMethod;

    await order.save();

    res.status(200).json({ message: "Заказ успешно обновлен.", order });
  } catch (err) {
    return sendServerError(res, "Ошибка обновления заказа:", err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return sendError(res, 404, "Заказ не найден.");
    }

    res.status(200).json({ message: "Заказ успешно удален." });
  } catch (err) {
    return sendServerError(res, "Ошибка удаления заказа:", err);
  }
};

module.exports = {
  getOrderById,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
