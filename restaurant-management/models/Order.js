const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [String],
    totalAmount: Number,
    status: String
});

module.exports = mongoose.model('Order', OrderSchema);
