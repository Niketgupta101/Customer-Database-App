const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    status: { type: String, enum: ['Processing', 'Done'], default: 'Processing' },
    order_id: { type: Schema.ObjectId, ref: 'Order' },
    product_id: { type: String, required: true },
    SKU_id: { type: String, unique: true }
},{
    timestamps: true,
})

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;