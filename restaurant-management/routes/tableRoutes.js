const express = require('express');
const Table = require('../models/Table');
const Reservation = require('../models/Reservation');
const router = express.Router();


router.get('/', async (req, res) => {
    const tables = await Table.find();
    res.json(tables);
});


router.post('/', async (req, res) => {
    const { tableNumber, seats } = req.body;

    const table = new Table({
        tableNumber,
        seats,
        isAvailable: true
    });

    await table.save();
    res.json({ message: "Table added" });
});

                  
router.post('/reserve', async (req, res) => {
    const { tableNumber, customerName, time } = req.body;

    const table = await Table.findOne({ tableNumber });

    if (!table) {
        return res.status(404).json({ message: "Table not found" });
    }

    if (!table.isAvailable) {
        return res.status(400).json({ message: "Table not available" });
    }

    table.isAvailable = false;
    await table.save();

    const reservation = new Reservation({
        tableNumber,
        customerName,
        time
    });

    await reservation.save();

    res.json({ message: "Table reserved successfully" });
});

module.exports = router;
