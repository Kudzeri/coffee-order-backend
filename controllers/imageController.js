const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExtension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(file.mimetype);
  if (isValid) {
    cb(null, true);
  } else {
    cb(
      new Error("Неправильный формат файла. Доступны только изображения."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 16 * 1024 * 1024 },
  fileFilter: fileFilter,
}).single("image");

const uploadImage = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Не удалось загрузить изображение." });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ message: "Изображение успешно загружено", imageUrl });
};

module.exports = { upload, uploadImage };
