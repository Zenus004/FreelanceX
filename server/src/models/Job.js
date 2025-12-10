const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    budget: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    skills: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'completed', 'cancelled'],
        default: 'open'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attachments: [String]
}, {
    timestamps: true
});

// Indexes for search
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ skills: 1 });
jobSchema.index({ category: 1 });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
