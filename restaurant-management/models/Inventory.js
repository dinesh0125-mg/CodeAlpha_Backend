const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    itemName: String,
    quantity: Number
});

module.exports = mongoose.model('Inventory', InventorySchema);
