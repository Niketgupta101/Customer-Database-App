const express = require('express');

const customerRoutes = require('./customer.route');
const orderRoutes = require('./order.route');
const productRoutes = require('./product.route');

const router = express.Router();

router.get('/ping', (req, res, next) => {
    res.status(201).json({ success: true, message: 'API working fine.' });
})

router.use('/customer', customerRoutes);
router.use('/order', orderRoutes);
router.use('/product', productRoutes);

module.exports = router;