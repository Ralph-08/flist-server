const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  weekly_list: {
    type: Boolean,
    required: true,
    default: true,
  },
  finalized: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("List", listSchema);
