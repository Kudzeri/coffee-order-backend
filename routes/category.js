const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  getCategoryById,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const isAdmin = require("../middlewares/isAdminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/categories", authMiddleware, isAdmin, createCategory);
router.put("/categories/:id", authMiddleware, isAdmin, updateCategory);
router.get("/categories/:id", getCategoryById);
router.get("/categories", getCategories);
router.delete("/categories/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
