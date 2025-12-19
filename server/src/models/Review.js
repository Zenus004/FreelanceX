const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    engagement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Engagement',
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Prevent multiple reviews for same engagement by same user
reviewSchema.index({ engagement: 1, reviewer: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
