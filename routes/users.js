require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email: email });
  if (!user.length) return res.send().status(404);

  const isPasswordMatch = bcrypt.compareSync(password, user[0].password);
  if (!isPasswordMatch) return res.send().status(400);

  const userId = user[0]._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");

  const token = jwt.sign(
    { id: userId, email: user[0].email },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    }
  );
  
  res.status(200).json({ token: token });
});

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
