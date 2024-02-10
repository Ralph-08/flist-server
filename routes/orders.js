const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (_req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {

  const order = new Order({
    items: req.body.items
  });

  try {
    const newOrder = await order.save();
    res.status(201).send(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

module.exports = router;
