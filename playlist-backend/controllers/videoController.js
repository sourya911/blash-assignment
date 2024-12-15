const Video = require('../models/Video');
const User = require('../models/User');


exports.getUserVideos = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const videos = await Video.find({ uploadedBy: userId });

    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for this user' });
    }

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos', error: err.message });
  }
};

exports.getUserWithVideos = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate('videos');  

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching videos', error: err.message });
  }
};


exports.addVideo = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const userId = req.user.userId;

    const newVideo = new Video({
      title,
      description,
      url,
      uploadedBy: userId
    });

    await newVideo.save();

    await User.findByIdAndUpdate(userId, { $push: { videos: newVideo._id } });

    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: 'Error adding video', error: err.message });
  }
};
