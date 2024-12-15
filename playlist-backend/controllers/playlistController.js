const Playlist = require("../models/Playlist");
const Layout = require("../models/Layout");

const savePlaylist = async (req, res) => {
  const { title, videos } = req.body;
  const userId = req.user.id;

  const playlist = new Playlist({ userId, title, videos });
  await playlist.save();

  res.json({ message: "Playlist saved", playlist });
};

const saveLayout = async (req, res) => {
  const { layout } = req.body;
  const userId = req.user.id;

  await Layout.findOneAndUpdate({ userId }, { layout }, { upsert: true, new: true });
  res.json({ message: "Layout saved successfully" });
};

const getLayout = async (req, res) => {
  const userId = req.user.id;
  const layout = await Layout.findOne({ userId });

  res.json({ layout: layout?.layout || [] });
};

module.exports = { savePlaylist, saveLayout, getLayout };
