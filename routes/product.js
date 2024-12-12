const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getProductBySlug,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/products", authMiddleware, isAdmin, createProduct);
router.put("/products/:slug", authMiddleware, isAdmin, updateProduct);
router.get("/products/:slug", getProductBySlug);
router.get("/products", getProducts);
router.delete("/products/:slug", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
