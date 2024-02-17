require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
  const reqToken = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(reqToken, process.env.JWT_KEY);
  try {
    const orders = await Order.find({ user: decodedToken.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const reqToken = req.body.data.token.split(" ")[1];
  const decodedToken = jwt.verify(reqToken, process.env.JWT_KEY);
  const order = new Order({
    user: decodedToken.id,
    items: req.body.data.list.items,
  });
  try {
    const newOrder = await order.save();
    res.status(201).send(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
