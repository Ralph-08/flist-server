const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    order_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    items: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("Order", orderSchema);