import mongoose, { Schema } from "mongoose";

const itemDetailsSchema = new mongoose.Schema({
  item: String,
  description: String,
  quantity: Number,
  amount: Number,
  totalamount: Number,
});

const item = mongoose.model("item", itemDetailsSchema);

export default item;
