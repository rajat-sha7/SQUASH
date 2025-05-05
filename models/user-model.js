const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/squash");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
  },
  email:String,
  password:String,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product', // Corrected reference to match the model name
  }],
  orders:  {
    type: Array,
    default: [],
  },
  contact: {
    type: Number,
  },
  picture: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
