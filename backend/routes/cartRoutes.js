const express = require("express");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();




// ADD TO CART
router.post("/", protect, addToCart);

// GET USER CART
router.get("/", protect, getCart);

// UPDATE QUANTITY
router.put("/:id", protect, updateCartItem);

// REMOVE ITEM
router.delete("/:id", protect, removeFromCart);




module.exports = router;