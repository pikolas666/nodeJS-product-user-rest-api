const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: String, required: true },
  isOnSale: { type: Boolean, required: false },
  id: { type: String }

});

module.exports = mongoose.model("product", productSchema);