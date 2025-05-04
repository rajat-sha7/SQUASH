const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.flash('error', "You need to log in first.");
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Changed from JWT_SECRET to JWT_KEY
    const user = await userModel.findOne({ email: decoded.email }).select('-password');
    
    if (!user) {
      req.flash('error', "User not found.");
      return res.redirect('/');
    }

    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    req.flash('error', "Something went wrong.");
    return res.redirect('/');
  }
};

module.exports = isLoggedIn;
