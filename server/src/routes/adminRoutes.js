const express = require('express');
const router = express.Router();
const {
    getDashboardStats,
    banUser,
    deleteJob
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/stats', protect, authorize('admin'), getDashboardStats);
router.patch('/users/:id/ban', protect, authorize('admin'), banUser);
router.delete('/jobs/:id', protect, authorize('admin'), deleteJob);

module.exports = router;
