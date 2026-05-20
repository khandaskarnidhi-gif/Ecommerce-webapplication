const Product = require("../models/productModel");

// ===============================
// CREATE PRODUCT
// ===============================
exports.createProduct = async (
  req,
  res
) => {

  try {

    const product =
      await Product.create({
        name: req.body.name,
        description:
          req.body.description,
        price: req.body.price,
        category:
          req.body.category,
        image: req.body.image,
        stock: req.body.stock,
      });

    res.status(201).json(
      product
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ===============================
// GET ALL PRODUCTS
// ===============================
exports.getProducts = async (
  req,
  res
) => {

  try {

    const products =
      await Product.find();

    res.status(200).json(
      products
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ===============================
// GET SINGLE PRODUCT
// ===============================
exports.getProductById =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });

      }

      res.status(200).json(
        product
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };

// ===============================
// UPDATE PRODUCT
// ===============================
exports.updateProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });

      }

      product.name =
        req.body.name ||
        product.name;

      product.description =
        req.body.description ||
        product.description;

      product.price =
        req.body.price ||
        product.price;

      product.category =
        req.body.category ||
        product.category;

      product.image =
        req.body.image ||
        product.image;

      product.stock =
        req.body.stock ||
        product.stock;

      const updatedProduct =
        await product.save();

      res.status(200).json(
        updatedProduct
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };

// ===============================
// DELETE PRODUCT
// ===============================
exports.deleteProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });

      }

      await product.deleteOne();

      res.status(200).json({
        message:
          "Product deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };

// ===============================
// CREATE REVIEW
// ===============================
exports.createReview =
  async (req, res) => {

    try {

      const {
        rating,
        comment,
      } = req.body;

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });

      }

      // CHECK IF ALREADY REVIEWED
      const alreadyReviewed =
        product.reviews.find(
          (review) =>
            review.user.toString() ===
            req.user._id.toString()
        );

      if (alreadyReviewed) {

        return res.status(400).json({
          message:
            "Already reviewed",
        });

      }

      const review = {

        user: req.user._id,

        name: req.user.name,

        rating: Number(rating),

        comment,

      };

      product.reviews.push(
        review
      );

      product.numReviews =
        product.reviews.length;

      product.rating =
        product.reviews.reduce(
          (acc, item) =>
            item.rating + acc,
          0
        ) /
        product.reviews.length;

      await product.save();

      res.status(201).json({
        message:
          "Review added",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };