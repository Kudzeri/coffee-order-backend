const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: false, 
      minlength: 10, 
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// Экспортируем модель отзыва
module.exports = mongoose.model("Review", ReviewSchema);
