const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  songs: [{
    title: String,
    artist: String,
  }],
});

module.exports = mongoose.model('Playlist', playlistSchema);
