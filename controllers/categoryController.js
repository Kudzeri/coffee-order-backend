const Category = require("../models/Category");
const { sendError, sendServerError } = require("../utils/errorHandler");
const {
  createCategoryValidation,
  updateCategoryValidation,
} = require("../validations/categoryValidation");

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return sendError(res, 404, "Категория не найдена.");
    }

    res.status(200).json({ category });
  } catch (err) {
    return sendServerError(res, "Ошибка получения категории:", err);
  }
};

const getCategories = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const categories = await Category.find().skip(skip).limit(limit);
    const totalCategories = await Category.countDocuments();

    res.status(200).json({
      categories,
      totalPages: Math.ceil(totalCategories / limit),
      currentPage: page,
    });
  } catch (err) {
    return sendServerError(res, "Ошибка получения категорий:", err);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const { error } = createCategoryValidation(req.body);
    if (error) {
      return sendError(
        res,
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return sendError(res, 400, "Категория с таким именем уже существует.");
    }

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({ message: "Категория успешно создана.", category });
  } catch (err) {
    return sendServerError(res, "Ошибка создания категории:", err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const { error } = updateCategoryValidation(req.body);
    if (error) {
      return sendError(
        res,
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    const category = await Category.findById(id);
    if (!category) {
      return sendError(res, 404, "Категория не найдена.");
    }

    if (name) category.name = name;
    if (description) category.description = description;

    await category.save();

    res.status(200).json({ message: "Категория успешно обновлена.", category });
  } catch (err) {
    return sendServerError(res, "Ошибка обновления категории:", err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return sendError(res, 404, "Категория не найдена.");
    }

    res.status(200).json({ message: "Категория успешно удалена." });
  } catch (err) {
    return sendServerError(res, "Ошибка удаления категории:", err);
  }
};

module.exports = {
  getCategoryById,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
