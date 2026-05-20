const express = require("express");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();


// USER ONLY
router.get("/user", protect, (req, res) => {
  res.json({
    message: "User Route Accessed",
  });
});


// ADMIN ONLY
router.get("/admin", protect, admin, (req, res) => {
  res.json({
    message: "Admin Route Accessed",
  });
});


module.exports = router;