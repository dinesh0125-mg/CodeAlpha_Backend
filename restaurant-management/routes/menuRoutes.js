const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();


router.get('/', async (req, res) => {
    const menu = await Menu.find();
    res.json(menu);
});


router.post('/', async (req, res) => {
    const { name, price, available } = req.body;

    const menuItem = new Menu({
        name,
        price,
        available
    });

    await menuItem.save();
    res.json({ message: "Menu item added" });
});

module.exports = router;
