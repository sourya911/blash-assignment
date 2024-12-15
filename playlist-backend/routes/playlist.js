const express = require("express");
const { savePlaylist, saveLayout, getLayout } = require("../controllers/playlistController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const playlists = await Playlist.find();
      res.json(playlists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching playlists' });
    }
  });
  

router.post("/save-playlist", authMiddleware, savePlaylist);
router.post("/save-layout", authMiddleware, saveLayout);
router.get("/get-layout", authMiddleware, getLayout);

module.exports = router;
