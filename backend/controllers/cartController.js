const Cart = require("../models/Cart");
const Product = require("../models/productModel");




// ADD TO CART
exports.addToCart = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    // CHECK PRODUCT
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // CHECK IF PRODUCT ALREADY IN CART
    const existingItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingItem) {

      existingItem.quantity += quantity;

      await existingItem.save();

      return res.status(200).json(existingItem);
    }

    // CREATE NEW CART ITEM
    const cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity,
    });

    res.status(201).json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};






// GET USER CART
exports.getCart = async (req, res) => {

  try {

    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    // CALCULATE TOTAL
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });

    res.status(200).json({
      cartItems,
      totalPrice,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};






// UPDATE CART ITEM QUANTITY
exports.updateCartItem = async (req, res) => {

  try {

    const { quantity } = req.body;

    const cartItem = await Cart.findById(req.params.id);

    // CHECK ITEM EXISTS
    if (!cartItem) {

      return res.status(404).json({
        message: "Cart item not found",
      });

    }

    // SECURITY CHECK
    if (
      cartItem.user.toString() !== req.user._id.toString()
    ) {

      return res.status(403).json({
        message: "Not authorized",
      });

    }

    // UPDATE QUANTITY
    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};






// REMOVE ITEM FROM CART
exports.removeFromCart = async (req, res) => {

  try {

    const cartItem = await Cart.findById(req.params.id);

    // CHECK ITEM EXISTS
    if (!cartItem) {

      return res.status(404).json({
        message: "Cart item not found",
      });

    }

    // SECURITY CHECK
    if (
      cartItem.user.toString() !== req.user._id.toString()
    ) {

      return res.status(403).json({
        message: "Not authorized",
      });

    }

    // DELETE ITEM
    await cartItem.deleteOne();

    res.status(200).json({
      message: "Item removed from cart",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};