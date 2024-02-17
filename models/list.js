const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  weekly_list: {
    type: Boolean,
    default: false
  },
  finalized: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("List", listSchema);
