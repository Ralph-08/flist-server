const express = require("express");
const router = express.Router();
const Item = require("../models/item");


router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:asin", () => {
    res.json(res.item)
})

module.exports = router;