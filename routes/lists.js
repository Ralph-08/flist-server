require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const List = require("../models/list");

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

router.get("/", async (req, res) => {
  const reqToken = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(reqToken, process.env.JWT_KEY);
  try {
    const lists = await List.find({ user: decodedToken.id });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:listId", getList, (_req, res) => {
  res.send(res.list);
});

router.post("/", async (req, res) => {
  const reqToken = req.body.token.split(" ")[1];
  const decodedToken = jwt.verify(reqToken, process.env.JWT_KEY);
  try {
    const newList = await new List({
      user: decodedToken.id,
      weekly_list: req.body.weekly_list,
    });
    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
  if (!req.body.length) return;
  for (let i = 0; i < req.body.length; i++) {
    res.list.items = res.list.items.filter((item) => item._id !== req.body[i]);
  }

  try {
    const updatedListItems = res.list.save();
    res.status(200).send(updatedListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:listId", async (req, res) => {
  try {
    const findList = await List.findById(req.params.listId);
    await findList.deleteOne();
    res.status(202).send("List deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
