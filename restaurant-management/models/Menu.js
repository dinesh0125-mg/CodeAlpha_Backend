const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: String,
    price: Number,
    available: Boolean
});

module.exports = mongoose.model('Menu', MenuSchema);
