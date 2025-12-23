const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUserProfile,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshAccessToken);
// Password recovery
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

// router.post('/reset-password', resetPassword); // Removing old stub route

router.get('/profile', protect, getUserProfile);

module.exports = router;
