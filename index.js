require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connectected to databse"));

app.use(cors());
app.use(express.json());

const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

const listsRouter = require("./routes/lists");
app.use("/lists", listsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});