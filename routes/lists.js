const express = require("express");
const router = express.Router();
const List = require("../models/list");
const { lock } = require("./items");

const getList = async (req, res, next) => {
  let list;
  try {
    list = await List.findById(req.params.listId);
    if (!list) {
      return res.status(404).json({ message: "Cannot find list" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.list = list;
  next();
};

router.get("/", async (_req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:listId", getList, (_req, res) => {
  res.send(res.list);
});

router.patch("/:listId", getList, async (req, res) => {
  if (req.body != null) {
    res.list.items = [...res.list.items, req.body];
  }

  try {
    const updatedList = await res.list.save();
    res.status(201).send(updatedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:listId", getList, async (req, res) => {
  if (req.body != null) {
    res.list.items = res.list.items.filter((item, i) => (item._id = !req.body[i]));
  }

  try {
    const updatedListItems = res.list.save();
    res.status(200).send(updatedListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
