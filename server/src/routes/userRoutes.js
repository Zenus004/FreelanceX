const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUserProfile, addFunds } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), getUsers);
router.get('/:id', protect, getUserById);
router.patch('/profile', protect, updateUserProfile);
router.post('/add-funds', protect, addFunds);

module.exports = router;
