const User = require('../models/User');
const Job = require('../models/Job');
const Engagement = require('../models/Engagement');

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeJobs = await Job.countDocuments({ status: 'open' });
        const inProgressJobs = await Job.countDocuments({ status: 'in_progress' });
        const completedJobs = await Job.countDocuments({ status: 'completed' });
        const cancelledJobs = await Job.countDocuments({ status: 'cancelled' });

        // Calculate total revenue (simulated from Engagements)
        const engagements = await Engagement.find();
        const totalRevenue = engagements.reduce((acc, curr) => acc + curr.totalAmount, 0);

        // Top Freelancers (by balance/earnings)
        const topFreelancers = await User.find({ role: 'freelancer' })
            .sort({ balance: -1 })
            .limit(5)
            .select('name balance profile.rating');

        // Recent Jobs
        const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(5);

        res.json({
            totalUsers,
            activeJobs,
            inProgressJobs,
            completedJobs,
            cancelledJobs,
            totalRevenue,
            topFreelancers,
            recentJobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const banUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.status = 'banned';
        await user.save();

        res.json({ message: 'User banned successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats,
    banUser,
    deleteJob
};
