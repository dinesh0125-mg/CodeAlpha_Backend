const express = require('express');
const Inventory = require('../models/Inventory');
const router = express.Router();


router.get('/', async (req, res) => {
    const inventory = await Inventory.find();
    res.json(inventory);
});


router.post('/', async (req, res) => {
    const { itemName, quantity } = req.body;

    const item = new Inventory({
        itemName,
        quantity
    });

    await item.save();
    res.json({ message: "Inventory added" });
});

module.exports = router;
