const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    engagement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Engagement',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'released'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

module.exports = Milestone;
