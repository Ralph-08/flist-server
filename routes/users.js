const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  if ([...(await User.find({ email: email }))].length) {
    return res.send(false);
  }

  const user = new User({
    email: email,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
