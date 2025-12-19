const express = require('express');
const router = express.Router();
const { getMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:room/messages', protect, getMessages);

module.exports = router;
