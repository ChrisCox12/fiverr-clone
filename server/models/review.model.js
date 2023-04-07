const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    creatorId: {
        type: String,
        required: true
    },
    creatorLocation: {
        type: String,
    },
    creatorImage: {
        type: String
    },
    creatorName: {
        type: String,
        required: true
    },
    gigId: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5]
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Review = model('Review', reviewSchema);
module.exports = Review;