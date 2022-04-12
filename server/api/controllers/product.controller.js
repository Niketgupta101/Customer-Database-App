const Product = require('../models/product');
const Order = require('../models/order');

const getAllProductsForOrder = async (req, res, next) => {
    const { orderId } = req.params;

    try {
        const products = await Product.find({ order_id: orderId }).sort({ createdAt: -1 });
        
        res.status(201).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

const fetchProductById = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await Product.findOne({ _id: productId });
        
        if(!product)
        res.status(404).json({ success: true, message: 'No product found with given Id.' });

        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

const createProduct = async (req, res, next) => {
    let product = req.body;
    const { orderId } = req.params;
    try {
        const order = await Order.findOne({ _id: orderId });

        if(!order)
        res.status(404).json({ success: true, message: 'No order found with given Id.' });
        
        product.SKU_id = `Appleute_${orderId}_${order.total_products + 1}`;

        order.set({ total_products: order.total_products + 1 });
        
        const newProduct = await Product.create({ ...product, order_id: orderId });
        await order.save();

        res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

const updateProductById = async (req, res, next) => {
    const { productId } = req.params;
    const newProduct = req.body;

    try {
        const product = await Product.findOne({ _id: productId });

        if(!product)
        res.status(404).json({ success: true, message: 'No product found with given Id.' });

        product.set({...newProduct});
        await product.save();

        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

const deleteProductById = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findOne({ _id: productId });

        if(!product)
        res.status(404).json({ success: true, message: 'No product found with given Id.' });

        await product.remove();

        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

module.exports = { getAllProductsForOrder, fetchProductById, createProduct, updateProductById, deleteProductById };