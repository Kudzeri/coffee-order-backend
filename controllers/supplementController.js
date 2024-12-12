const Supplement = require("../models/Supplement");
const { sendError, sendServerError } = require("../utils/errorHandler");
const {
  createSupplementValidation,
  updateSupplementValidation,
} = require("../validations/supplementValidation");

const getSupplementById = async (req, res) => {
  try {
    const { id } = req.params;

    const supplement = await Supplement.findById(id);
    if (!supplement) {
      return sendError(res, 404, "Добавка не найдена.");
    }

    res.status(200).json({ supplement });
  } catch (err) {
    return sendServerError(res, "Ошибка получения добавки:", err);
  }
};

const getSupplements = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const supplements = await Supplement.find().skip(skip).limit(limit);
    const totalSupplements = await Supplement.countDocuments();

    res.status(200).json({
      supplements,
      totalPages: Math.ceil(totalSupplements / limit),
      currentPage: page,
    });
  } catch (err) {
    return sendServerError(res, "Ошибка получения добавок:", err);
  }
};

const createSupplement = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const { error } = createSupplementValidation(req.body);
    if (error) {
      return sendError(
        res,
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    const existingSupplement = await Supplement.findOne({ name });
    if (existingSupplement) {
      return sendError(res, 400, "Добавка с таким именем уже существует.");
    }

    const supplement = new Supplement({ name, description, price });
    await supplement.save();

    res.status(201).json({ message: "Добавка успешно создана.", supplement });
  } catch (err) {
    return sendServerError(res, "Ошибка создания добавки:", err);
  }
};

const updateSupplement = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const { error } = updateSupplementValidation(req.body);
    if (error) {
      return sendError(
        res,
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    const supplement = await Supplement.findById(id);
    if (!supplement) {
      return sendError(res, 404, "Добавка не найдена.");
    }

    if (name) supplement.name = name;
    if (description) supplement.description = description;
    if (price) supplement.price = price;

    await supplement.save();

    res.status(200).json({ message: "Добавка успешно обновлена.", supplement });
  } catch (err) {
    return sendServerError(res, "Ошибка обновления добавки:", err);
  }
};

const deleteSupplement = async (req, res) => {
  try {
    const { id } = req.params;

    const supplement = await Supplement.findByIdAndDelete(id);
    if (!supplement) {
      return sendError(res, 404, "Добавка не найдена.");
    }

    res.status(200).json({ message: "Добавка успешно удалена." });
  } catch (err) {
    return sendServerError(res, "Ошибка удаления добавки:", err);
  }
};

module.exports = {
  getSupplementById,
  getSupplements,
  createSupplement,
  updateSupplement,
  deleteSupplement,
};
