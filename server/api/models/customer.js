const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: { type: String, required: true, text: true, index: true },
    emailId: { type: String, required: true, unique: true },
    contact_no: { type: Number, length: 10 },
    no_of_orders: { type: Number, default: 0 },
},{
    timestamps: true,
})

const customerModel = mongoose.model('Customer', customerSchema);

module.exports = customerModel;