const express = require("express");

const router = express.Router();

const upload =
  require("../middleware/uploadMiddleware");

router.post(
  "/",
  upload.single("image"),
  (req, res) => {

    try {

      res.status(200).json({
        imageUrl: req.file.path,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

module.exports = router;