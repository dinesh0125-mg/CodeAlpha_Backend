const express = require('express');
const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const router = express.Router();


router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});


router.post('/', async (req, res) => {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items in order" });
    }

   
    for (let item of items) {
        const inventoryItem = await Inventory.findOne({ itemName: item });

        if (!inventoryItem || inventoryItem.quantity <= 0) {
            return res.status(400).json({
                message: `${item} is out of stock`
            });
        }

        inventoryItem.quantity -= 1;
        await inventoryItem.save();
    }

    const order = new Order({
        items,
        totalAmount,
        status: "Placed"
    });

    await order.save();

    res.json({ message: "Order placed successfully" });
});

module.exports = router;
