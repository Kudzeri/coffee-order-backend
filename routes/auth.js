const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  editUserDetails,
  changeUserPassword
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.put("/edit-profile", authMiddleware, editUserDetails)
router.put("/edit-password", authMiddleware, changeUserPassword)

module.exports = router;
