const Review = require('../models/Review');
const Engagement = require('../models/Engagement');
const User = require('../models/User');

const createReview = async (req, res) => {
    try {
        const { engagementId, rating, comment } = req.body;
        const engagement = await Engagement.findById(engagementId);

        if (!engagement) {
            return res.status(404).json({ message: 'Engagement not found' });
        }

        if (engagement.status !== 'completed') {
            return res.status(400).json({ message: 'Engagement must be completed to leave a review' });
        }

        // Determine reviewee
        let revieweeId;
        if (engagement.client.toString() === req.user._id.toString()) {
            revieweeId = engagement.freelancer;
        } else if (engagement.freelancer.toString() === req.user._id.toString()) {
            revieweeId = engagement.client;
        } else {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const review = await Review.create({
            engagement: engagementId,
            reviewer: req.user._id,
            reviewee: revieweeId,
            rating,
            comment
        });

        // Update user's average rating
        const stats = await Review.aggregate([
            { $match: { reviewee: revieweeId } },
            {
                $group: {
                    _id: '$reviewee',
                    avgRating: { $avg: '$rating' },
                    count: { $sum: 1 }
                }
            }
        ]);

        if (stats.length > 0) {
            await User.findByIdAndUpdate(revieweeId, {
                'profile.rating': stats[0].avgRating,
                'profile.reviewCount': stats[0].count
            });
        }

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Review.find({ reviewee: req.params.userId })
            .populate('reviewer', 'name')
            .populate('engagement', 'job')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReview, getReviewsByUser };
