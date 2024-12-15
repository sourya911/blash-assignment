const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

router.get('/videos', authMiddleware, videoController.getUserVideos);
router.post('/videos', authMiddleware, videoController.addVideo);

module.exports = router;
