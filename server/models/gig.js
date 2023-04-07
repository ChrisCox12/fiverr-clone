const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const gigSchema = new Schema({
    creatorId: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    creator_image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    deliveryTime: {
        type: String,
        required: true
    },
    revisionNumber: {
        type: Number
    },
    features: {
        type: [String]
    },
    stars: {
        type: Number,
        default: 0
    },
    totalStars: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number, 
        default: 0
    },
    reviewIds: {
        type: [String]
    },
    price: {
        type: Number,
        required: true
    },
    orders: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Gig = model('Gig', gigSchema);
module.exports = Gig;