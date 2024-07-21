import mongoose, { Schema } from "mongoose";

// Define the enum for Indian states
const IndianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const shippingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    maxlength: 20,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: IndianStates, // Use the enum here
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "item",
    },
  ],
  payment: {
    type: String,
    enum: ["Paid", "Not Paid"],
  },
  subtotal: {
    type: Number,
    default: 0,
  },
  invoice_nr: {
    type: Number,
    default: 0,
    required: true,
    unique: true,
  },
  paid: {
    type: Number,
    default: 0,
  },
});

// Create a Mongoose model
const Shipping = mongoose.model("Shipping", shippingSchema);

export default Shipping;
