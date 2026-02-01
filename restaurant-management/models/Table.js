const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    tableNumber: Number,
    seats: Number,
    isAvailable: Boolean
});

module.exports = mongoose.model('Table', TableSchema);
