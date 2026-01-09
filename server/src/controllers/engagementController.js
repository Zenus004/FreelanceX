const Engagement = require('../models/Engagement');
const Milestone = require('../models/Milestone');
const User = require('../models/User');
const Job = require('../models/Job');

const getEngagement = async (req, res) => {
    try {
        const engagement = await Engagement.findById(req.params.id)
            .populate('job')
            .populate('client', 'name')
            .populate('freelancer', 'name');

        if (!engagement) {
            return res.status(404).json({ message: 'Engagement not found' });
        }

        // Check access
        if (
            engagement.client._id.toString() !== req.user._id.toString() &&
            engagement.freelancer._id.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const milestones = await Milestone.find({ engagement: engagement._id });

        res.json({ engagement, milestones });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMilestone = async (req, res, next) => {
    try {
        const { description, amount } = req.body;
        const engagement = await Engagement.findById(req.params.id);

        if (!engagement) {
            return res.status(404).json({ message: 'Engagement not found' });
        }

        if (engagement.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const milestone = await Milestone.create({
            engagement: engagement._id,
            description,
            amount
        });

        // Deduct from client balance
        const client = await User.findById(req.user._id);
        if (client.balance < Number(amount)) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        client.balance -= Number(amount);
        await client.save();

        // Fund escrow
        engagement.escrowBalance += Number(amount);
        await engagement.save();

        res.status(201).json(milestone);
    } catch (error) {
        next(error);
    }
};

const approveMilestone = async (req, res, next) => {
    try {
        const milestone = await Milestone.findById(req.params.id).populate('engagement');

        if (!milestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }

        const engagement = milestone.engagement;

        if (engagement.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (milestone.status === 'released') {
            return res.status(400).json({ message: 'Milestone already released' });
        }

        if (engagement.escrowBalance < milestone.amount) {
            return res.status(400).json({ message: 'Insufficient escrow balance' });
        }

        // Release funds
        milestone.status = 'released';
        await milestone.save();

        engagement.escrowBalance -= milestone.amount;
        await engagement.save();

        // Add to freelancer balance
        const freelancer = await User.findById(engagement.freelancer);
        freelancer.balance += milestone.amount;
        await freelancer.save();

        res.json({ message: 'Milestone approved and funds released', milestone });
    } catch (error) {
        next(error);
    }
};

const getEngagementByJob = async (req, res) => {
    try {
        const engagement = await Engagement.findOne({ job: req.params.jobId });
        if (!engagement) {
            return res.status(404).json({ message: 'Engagement not found' });
        }
        // Check access
        if (
            engagement.client.toString() !== req.user._id.toString() &&
            engagement.freelancer.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        res.json(engagement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const completeEngagement = async (req, res, next) => {
    try {
        const engagement = await Engagement.findById(req.params.id);

        if (!engagement) {
            return res.status(404).json({ message: 'Engagement not found' });
        }

        if (engagement.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (engagement.status === 'completed') {
            return res.status(400).json({ message: 'Engagement already completed' });
        }

        // Release any remaining escrow balance to freelancer
        if (engagement.escrowBalance > 0) {
            const freelancer = await User.findById(engagement.freelancer);
            freelancer.balance += engagement.escrowBalance;
            await freelancer.save();
            engagement.escrowBalance = 0;
        }

        engagement.status = 'completed';
        await engagement.save();

        const job = await Job.findById(engagement.job);
        if (job) {
            job.status = 'completed';
            await job.save();
        }

        res.json({ message: 'Engagement completed', engagement });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getEngagement,
    createMilestone,
    approveMilestone,
    getEngagementByJob,
    completeEngagement
};
