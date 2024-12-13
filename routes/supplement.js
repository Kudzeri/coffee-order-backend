const express = require("express");
const router = express.Router();
const {
  createSupplement,
  updateSupplement,
  getSupplementById,
  getSupplements,
  deleteSupplement,
} = require("../controllers/supplementController");
const isAdmin = require("../middlewares/isAdminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/supplements", authMiddleware, isAdmin, createSupplement);
router.put("/supplements/:id", authMiddleware, isAdmin, updateSupplement);
router.get("/supplements/:id", getSupplementById);
router.get("/supplements", getSupplements);
router.delete("/supplements/:id", authMiddleware, isAdmin, deleteSupplement);

module.exports = router;
