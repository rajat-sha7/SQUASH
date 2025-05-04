const express = require("express");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/genrateToken");

const registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'You already have an account');
      return res.redirect('/'); // Redirect to the registration page or appropriate page
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let newUser = await User.create({
      email,
      password: hash,
      fullname,
    });
    const token = generateToken(newUser);
    res.cookie("token", token);
    req.flash('success', 'User created successfully');
    res.redirect('/'); // Redirect to the home page or appropriate page
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/'); // Redirect to the registration page or appropriate page
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/'); // Redirect to the login page or appropriate page
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/'); // Redirect to the login page or appropriate page
    }

    const token = generateToken(existingUser);
    res.cookie("token", token);
    req.flash('success', 'Login successful');
    res.render('shop'); // Redirect to the home page or appropriate page
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/'); // Redirect to the login page or appropriate page
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  req.flash('success', 'Logout successful');
  res.redirect('/'); // Redirect to the home page or appropriate page
};

module.exports.loginUser = loginUser;
module.exports.registerUser = registerUser;
module.exports.logoutUser = logoutUser;
