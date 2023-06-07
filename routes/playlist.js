import express from "express";
const playlistRouter = express.Router();

const nicknameRegex = /^[A-Za-z0-9]+$/;

const getPlaylist = (req, res) => {
  const nickname = req.params.nickname.slice(1);
  if (!nicknameRegex.test(nickname)) {
    res.redirect("/");
  }
  try {
    const context = {
      username: "user#1",
    };
    return res.render("playlists/playlist", context);
  } catch (e) {
    return res.send("Something Wrong!");
  }
};

playlistRouter.get("/:nickname", getPlaylist);

export default playlistRouter;
