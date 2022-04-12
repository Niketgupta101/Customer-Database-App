const Customer = require('../models/customer');

const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find({}).sort({ createdAt: -1 });

        res.status(201).json({ success: true, customers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}


const getCustomerById = async (req, res, next) => {
    const { customerId } = req.params;
    try {
        const customer = await Customer.findOne({ _id: customerId });

        if(!customer)
        return res.status(404).json({ success: false, message: 'No customer available with given Id.' });

        return res.status(201).json({ success: true, customer });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}


const createCustomer = async (req, res, next) => {
    const customer = req.body;
    try {
        const newCustomer = await Customer.create(customer);

        res.status(201).json({ success: true, customer: newCustomer });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
}

module.exports = { getAllCustomers, getCustomerById, createCustomer };