const Order = require("../models/Order"); // модель заказа
const { sendError, sendServerError } = require("../utils/errorHandler");
const {
  createOrderValidation,
  updateOrderValidation,
} = require("../validations/orderValidation");

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("products.productId supplements");
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
    const { page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .skip(skip)
      .limit(limit)
      .populate("products.productId supplements");
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      orders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (err) {
    return sendServerError(res, "Ошибка получения заказов:", err);
  }
};

const createOrder = async (req, res) => {
  try {
    const { products, supplements, totalPrice, orderDate, userId } = req.body;

    const { error } = createOrderValidation(req.body);
    if (error) {
      return sendError(
        res,
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    const order = new Order({
      products,
      supplements,
      totalPrice,
      orderDate,
      userId,
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
    const { products, supplements, totalPrice, orderDate, userId } = req.body;

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

    if (products) order.products = products;
    if (supplements) order.supplements = supplements;
    if (totalPrice) order.totalPrice = totalPrice;
    if (orderDate) order.orderDate = orderDate;
    if (userId) order.userId = userId;

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
