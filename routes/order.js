const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrder,
  getOrderById,
  getOrders,
  deleteOrder,
} = require("../controllers/orderController");
const isAdmin = require("../middlewares/isAdminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/orders", authMiddleware, createOrder);
router.put("/orders/:id", authMiddleware, isAdmin, updateOrder);
router.get("/orders/:id", getOrderById);
router.get("/orders", getOrders);
router.delete("/orders/:id", authMiddleware, isAdmin, deleteOrder);

module.exports = router;
