const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    order_date: {
        type: Number,
        default: Date.now(),
    },
    items: {
        type: Object,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Order", orderSchema);