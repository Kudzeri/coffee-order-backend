const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const { insertAdmin } = require("./seeds/adminSeeder");
const authMiddleware = require("./middlewares/authMiddleware");
const isAdmin = require("./middlewares/isAdminMiddleware");
const { upload, uploadImage } = require("./controllers/imageController");
const path = require("path")

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/", require("./routes/category"));
app.use("/api/", require("./routes/supplement"));
app.use("/api/", require("./routes/product"));
app.post("/api/upload-image", authMiddleware, isAdmin, upload, uploadImage);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// insertAdmin();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
