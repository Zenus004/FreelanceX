const express = require('express');
const router = express.Router();
const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getJobsByClient
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/client/me', protect, authorize('client'), getJobsByClient);

router.route('/')
    .post(protect, authorize('client'), createJob)
    .get(getJobs);

router.route('/:id')
    .get(getJobById)
    .patch(protect, authorize('client', 'admin'), updateJob)
    .delete(protect, authorize('client', 'admin'), deleteJob);

module.exports = router;
