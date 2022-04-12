const express = require("express");

const {
  getOrderForCustomer,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
} = require("../controllers/order.controller");

const router = express.Router();

router.get("/all/:customerId", getOrderForCustomer);

router.get("/:orderId", getOrderById);

router.post("/:customerId", createOrder);

router.put("/:orderId", updateOrderById);

router.delete("/:orderId", deleteOrderById);

module.exports = router;
