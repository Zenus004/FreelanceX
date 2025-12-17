const mongoose = require('mongoose');

const engagementSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    proposal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    escrowBalance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Engagement = mongoose.model('Engagement', engagementSchema);

module.exports = Engagement;
