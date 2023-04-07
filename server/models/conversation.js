const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const conversationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
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
    readBySeller: {
        type: Boolean,
        default: false
    },
    readByBuyer: {
        type: Boolean,
        default: false
    },
    lastMessage: {
        type: String
    }
}, { timestamps: true });


const Conversation = model('Conversation', conversationSchema);
module.exports = Conversation;