// const { Schema } = require("mongoose");

// const OrdersSchema = new Schema({
//   name: String,
//   qty: Number,
//   price: Number,
//   mode: String,
// });

// module.exports = { OrdersSchema };

const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  mode: { type: String, enum: ["BUY", "SELL"], required: true },
}, { timestamps: true });

module.exports = OrdersSchema;