const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    tableNumber: Number,
    customerName: String,
    time: String
});

module.exports = mongoose.model('Reservation', ReservationSchema);
