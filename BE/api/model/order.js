const mongoose = require('mongoose');
const { Schema } = mongoose;

const Item = new Schema({
    type: {
        type: String,
    },
    count: {
        type: Number,
    },
    price: {
        type: Number,
    },
});

const Order = new Schema({
    createdAt: {
        type: Date,
    },
    items: [Item]
});


module.exports = mongoose.model('Order', Order);