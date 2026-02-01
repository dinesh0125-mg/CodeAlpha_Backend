const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/restaurantDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use('/menu', require('./routes/menuRoutes'));
app.use('/orders', require('./routes/orderRoutes'));
app.use('/tables', require('./routes/tableRoutes'));
app.use('/inventory', require('./routes/inventoryRoutes'));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
