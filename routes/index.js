const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn"); // Ensure the path to the middleware is correct

const productModel = require('../models/product-model');
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  let error = req.flash('error')

  res.render("index" , {error , loggedin:false}); // Render the shop view
});




router.get("/shop", isLoggedIn, async (req, res) => {
  // let products = []
let success = req.flash("success")
  let products= await productModel.find() || []
  res.render("shop" , {products , success}); // Render the shop view
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("index"); // Render the shop view
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  // let success = req.flash("success")
  console.log(user)
  // res.render('cart', {user})
});


router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  user.cart.push(req.params.productid.replace(':', '')); // Ensure id is cast to ObjectId
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect('/shop');
});

module.exports = router;
