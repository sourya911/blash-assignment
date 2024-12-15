const express = require('express');
const router = express.Router();
const { addVideo, getUserVideos,getUserWithVideos } = require('../controllers/videoController'); 


router.post('/videos', verifyToken, addVideo);  


router.get('/users/:userId/videos', getUserWithVideos);


router.get('/users/:userId/videos', verifyToken, async (req, res) => {
  const { userId } = req.params; 

  try {
    const videos = await Video.find({ uploadedBy: userId });

    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for this user' });
    }

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos', error: err.message });
  }
});

module.exports = router;
