const Product = require("../models/Product");
const { sendError, sendServerError } = require("../utils/errorHandler");
const {
  createProductValidation,
  updateProductValidation,
} = require("../validations/productValidation");

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug }).populate(
      "category supplements"
    );
    if (!product) {
      return sendError(res, 404, "Продукт не найден.");
    }

    res.status(200).json({ product });
  } catch (err) {
    return sendServerError(res, "Ошибка получения продукта:", err);
  }
};

const getProducts = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate("category supplements");
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (err) {
    return sendServerError(res, "Ошибка получения продуктов:", err);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, slug, image, category, description, supplements, price } =
      req.body;

    const { error } = createProductValidation(req.body);
    if (error) {
      return sendError(
        res,
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return sendError(res, 400, "Продукт с таким slug уже существует.");
    }

    const product = new Product({
      name,
      slug,
      image,
      category,
      description,
      supplements,
      price,
    });
    await product.save();

    res.status(201).json({ message: "Продукт успешно создан.", product });
  } catch (err) {
    return sendServerError(res, "Ошибка создания продукта:", err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      name,
      slug: newSlug,
      image,
      category,
      description,
      supplements,
      price,
    } = req.body;

    const { error } = updateProductValidation(req.body);
    if (error) {
      return sendError(
        res,
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    const product = await Product.findOne({ slug });
    if (!product) {
      return sendError(res, 404, "Продукт не найден.");
    }

    if (name) product.name = name;
    if (newSlug) product.slug = newSlug;
    if (image) product.image = image;
    if (category) product.category = category;
    if (description) product.description = description;
    if (supplements) product.supplements = supplements;
    if (price) product.price = price;

    await product.save();

    res.status(200).json({ message: "Продукт успешно обновлен.", product });
  } catch (err) {
    return sendServerError(res, "Ошибка обновления продукта:", err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOneAndDelete({ slug });
    if (!product) {
      return sendError(res, 404, "Продукт не найден.");
    }

    res.status(200).json({ message: "Продукт успешно удален." });
  } catch (err) {
    return sendServerError(res, "Ошибка удаления продукта:", err);
  }
};

module.exports = {
  getProductBySlug,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
