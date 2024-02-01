require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    const data = fs.readFileSync("./items.json");
  res.status(200).send(data);
});

app.post("/", (req, res) => {
    console.log(req.body);
    fs.writeFileSync("./items.json", JSON.stringify(req.body));
    res.status(201).json({ message: "POST request recieved" });
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
