const mongoose = require("mongoose");
const Product = require("./product");
const User = require("./user");

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product, // Reference to the Product model
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'rejected', 'approved'], // Possible statuses
        default: 'pending'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // Reference to the User model
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User // Reference to the User model (admin who reviewed the submission)
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review