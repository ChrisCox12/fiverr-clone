const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    gigId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    sellerId: {
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    paymentIntent: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Order = model('Order', orderSchema);
module.exports = Order;