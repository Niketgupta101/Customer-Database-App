const express = require('express');

const { getAllCustomers, getCustomerById, createCustomer } = require('../controllers/customer.controller');

const router = express.Router();

router.get('/', getAllCustomers);

router.get('/:customerId', getCustomerById);

router.post('/', createCustomer);

module.exports = router;