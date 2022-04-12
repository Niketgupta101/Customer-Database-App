const express = require("express");

const {
  getAllProductsForOrder,
  fetchProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/all/:orderId", getAllProductsForOrder);

router.get("/:productId", fetchProductById);

router.post("/:orderId", createProduct);

router.put("/:productId", updateProductById);

router.delete("/:productId", deleteProductById);

module.exports = router;
