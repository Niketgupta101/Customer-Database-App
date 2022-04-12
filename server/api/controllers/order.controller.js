const Order = require('../models/order');
const Customer = require('../models/customer');

const getOrderForCustomer = async (req, res, next) => {
    const { customerId } = req.params;

    try {
        const orders = await Order.find({ customer_id: customerId }).sort({ createdAt: -1 });
        
        res.status(201).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

const getOrderById = async (req, res, next) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOne({ _id: orderId });
        
        if(!order)
        res.status(404).json({ success: true, message: 'No order found with given Id.' });

        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

const createOrder = async (req, res, next) => {
    let order = req.body;
    const { customerId } = req.params;
    try {
        const customer = await Customer.findOne({ _id: customerId });

        if(!customer)
        res.status(404).json({ success: true, message: 'No customer found with given Id.' });
        
        order.SKU_id = `Appleute_${customerId}_${customer.no_of_orders + 1}`;

        customer.set({ no_of_orders: customer.no_of_orders + 1 });
        
        const newOrder = await Order.create({ ...order, customer_id: customerId });
        await customer.save();

        res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

const updateOrderById = async (req, res, next) => {
    const { orderId } = req.params;
    const newOrder = req.body;

    try {
        const order = await Order.findOne({ _id: orderId });

        if(!order)
        res.status(404).json({ success: true, message: 'No order found with given Id.' });

        order.set({...newOrder});
        await order.save();

        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

const deleteOrderById = async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findOne({ _id: orderId });

        if(!order)
        res.status(404).json({ success: true, message: 'No order found with given Id.' });

        await order.remove();

        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

module.exports = { getOrderForCustomer, getOrderById, createOrder, updateOrderById, deleteOrderById };