const Wishlist =
  require("../models/wishlistModel");

// ADD TO WISHLIST
exports.addToWishlist =
  async (req, res) => {

    try {

      const exists =
        await Wishlist.findOne({

          user: req.user._id,

          product:
            req.body.productId,

        });

      if (exists) {

        return res.status(400).json({
          message:
            "Already in wishlist",
        });

      }

      const wishlistItem =
        await Wishlist.create({

          user: req.user._id,

          product:
            req.body.productId,

        });

      res.status(201).json(
        wishlistItem
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };

// GET WISHLIST
exports.getWishlist =
  async (req, res) => {

    try {

      const wishlist =
        await Wishlist.find({

          user: req.user._id,

        }).populate("product");

      res.status(200).json(
        wishlist
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };

// REMOVE FROM WISHLIST
exports.removeFromWishlist =
  async (req, res) => {

    try {

      const item =
        await Wishlist.findById(
          req.params.id
        );

      if (!item) {

        return res.status(404).json({
          message:
            "Item not found",
        });

      }

      await item.deleteOne();

      res.status(200).json({
        message:
          "Removed from wishlist",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };