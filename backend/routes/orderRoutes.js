const express = require("express");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();




// PLACE ORDER
router.post("/", protect, placeOrder);

// GET MY ORDERS
router.get("/myorders", protect, getMyOrders);

// GET ALL ORDERS (ADMIN)
router.get("/", protect, admin, getAllOrders);

// UPDATE ORDER STATUS (ADMIN)
router.put("/:id", protect, admin, updateOrderStatus);




module.exports = router;