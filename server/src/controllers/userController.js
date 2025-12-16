const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Job = require('../models/Job');
const Engagement = require('../models/Engagement');

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (user) {
            const userData = user.toObject();

            if (user.role === 'client') {
                // Calculate Total Jobs
                const totalJobs = await Job.countDocuments({ client: user._id });

                // Calculate Total Spent
                const spentStats = await Engagement.aggregate([
                    { $match: { client: user._id, status: 'completed' } },
                    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
                ]);
                const totalSpent = spentStats.length > 0 ? spentStats[0].total : 0;

                userData.stats = {
                    totalJobs,
                    totalSpent
                };
            } else if (user.role === 'freelancer') {
                // Calculate Freelancer Stats
                const completedJobs = await Engagement.countDocuments({
                    freelancer: user._id,
                    status: 'completed'
                });

                const earningStats = await Engagement.aggregate([
                    { $match: { freelancer: user._id, status: 'completed' } },
                    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
                ]);
                const totalEarnings = earningStats.length > 0 ? earningStats[0].total : 0;

                userData.stats = {
                    jobsCompleted: completedJobs,
                    totalEarnings
                };
            }

            res.json(userData);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }

            if (req.body.profile) {
                user.profile = { ...user.profile, ...req.body.profile };
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                profile: updatedUser.profile,
                balance: updatedUser.balance
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addFunds = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.balance += Number(amount);
        await user.save();

        res.json({
            message: 'Funds added successfully',
            balance: user.balance
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, getUserById, updateUserProfile, addFunds };
