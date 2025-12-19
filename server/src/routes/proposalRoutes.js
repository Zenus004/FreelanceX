const express = require('express');
const router = express.Router();
const {
    submitProposal,
    getProposalsByJob,
    updateProposalStatus,
    getProposalsByFreelancer
} = require('../controllers/proposalController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/freelancer/me', protect, authorize('freelancer'), getProposalsByFreelancer);
router.post('/', protect, authorize('freelancer'), submitProposal);
router.get('/job/:jobId', protect, authorize('client'), getProposalsByJob);
router.patch('/:id', protect, authorize('client'), updateProposalStatus);

module.exports = router;
