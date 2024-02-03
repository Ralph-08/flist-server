const express = require("express");
const router = express.Router();
const Item = require("../models/item");

const getItem = async (req, res, next) => {
  let item;
  try {
    item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: "Cannot find item" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.item = item;
  next();
};

router.get("/", async (_req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:itemId", getItem, (_req, res) => {
  res.json(res.item);
});

module.exports = router;
