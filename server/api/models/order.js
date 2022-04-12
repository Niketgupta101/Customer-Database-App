const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer_id: { type: Schema.ObjectId, ref: 'Customer' },
    status: { type: String, enum: ['Processing', 'Done'], default: 'Processing' },
    products_processed: { type: Number, default: 0 },
    total_products: { type: Number, default: 0 },
    SKU_id: { type: String, unique: true }
},{
    timestamps: true,
})

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;