const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn"); // Ensure the path to the middleware is correct

const productModel = require('../models/product-model')

router.get("/", (req, res) => {
  let error = req.flash('error')

  res.render("index" , {error}); // Render the shop view
});


router.get("/shop", isLoggedIn, async (req, res) => {
  // let products = []

  let products= await productModel.find()
  res.render("shop" , {products}); // Render the shop view
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("index"); // Render the shop view
});

module.exports = router;
