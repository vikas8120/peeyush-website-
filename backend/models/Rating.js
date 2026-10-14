const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    message: {
        type: String,   // LBM
        trim: true
    },
    service: {
        type: String,
        default: 'wedding'
    },
    approved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
ratingSchema.index({ approved: 1, createdAt: -1 });

module.exports = mongoose.model('Rating', ratingSchema);
