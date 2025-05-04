const express = require("express");
const router = express.Router();
const { registerUser , loginUser ,logoutUser} = require("../controllers/authController");

// Get all users
router.get("/", async (req, res) => {
  res.render("index");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/logout", logoutUser);

module.exports = router;
