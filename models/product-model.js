const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  discount: {
    type: Number,
    defaults: 0,
  },
  bgcolor: String,
  panecolor: String,
  textcolor: String,
});

module.exports = mongoose.model("product", productSchema);
