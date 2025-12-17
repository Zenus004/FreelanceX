const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    deliveryDays: {
        type: Number,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Ensure freelancer can only submit one proposal per job
proposalSchema.index({ job: 1, freelancer: 1 }, { unique: true });

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
