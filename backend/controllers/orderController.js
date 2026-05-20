const Order = require("../models/Order");
const Cart = require("../models/Cart");




// PLACE ORDER
exports.placeOrder = async (req, res) => {

  try {

    const {
      shippingAddress,
      paymentMethod,
    } = req.body;

    // GET USER CART
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (cartItems.length === 0) {

      return res.status(400).json({
        message: "Cart is empty",
      });

    }

    // CREATE ORDER ITEMS
    const orderItems = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // CALCULATE TOTAL
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });

    // CREATE ORDER
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    // CLEAR CART
    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};






// GET MY ORDERS
exports.getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user._id,
    }).populate("orderItems.product");

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};






// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product");

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};






// UPDATE ORDER STATUS (ADMIN)
exports.updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    order.orderStatus = status;

    await order.save();

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
exports.updateOrderStatus = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    order.orderStatus =
      req.body.orderStatus;

    const updatedOrder =
      await order.save();

    res.status(200).json(
      updatedOrder
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};