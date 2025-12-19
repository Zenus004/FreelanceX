const express = require('express');
const router = express.Router();
const {
    getEngagement,
    createMilestone,
    approveMilestone,
    getEngagementByJob,
    completeEngagement
} = require('../controllers/engagementController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/job/:jobId', protect, getEngagementByJob);
router.get('/:id', protect, getEngagement);
router.post('/:id/milestones', protect, authorize('client'), createMilestone);
router.patch('/milestones/:id/approve', protect, authorize('client'), approveMilestone);
router.patch('/:id/complete', protect, authorize('client'), completeEngagement);

module.exports = router;
