const mongoose = require('mongoose');

const LayoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  layout: [
    {
      playlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
      position: Number,
    },
  ],
});

module.exports = mongoose.model('Layout', LayoutSchema);
