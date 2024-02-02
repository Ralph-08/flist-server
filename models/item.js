const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  asin: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  ratings_total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema)
