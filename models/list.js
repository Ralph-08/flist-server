const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  weekly_list: {
    type: Boolean,
    required: true,
    default: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("List", listSchema);
