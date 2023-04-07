const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    country: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    reviews: {
        type: Number,
        default: 0
    },
    totalStars: {
        type: Number,
        default: 0
    },
    stars: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


const User = model('User', userSchema);
module.exports = User;