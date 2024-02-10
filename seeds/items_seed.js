require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("../models/item");
const itemsData = require("../data/items.json");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connectected to databse"));

const seedItemsDB = async () => {
  await Item.deleteMany({});
  await Item.insertMany(itemsData);
};

seedItemsDB().then(() => {
  mongoose.connection.close();
});
