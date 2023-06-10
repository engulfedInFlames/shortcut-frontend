import express from "express";
const ForumRouter = express.Router();

const channelRegex = /^@[A-Za-z0-9]+$/;

const getCommunity = (req, res) => {
  const channel = req.params.channel;
  if (!channelRegex.test(channel)) {
    res.redirect("/");
  }
  try {
    return res.render("forum/community");
  } catch (e) {
    return res.send("Something Wrong!");
  }
};

ForumRouter.get("/:channel/community", getCommunity);

export default ForumRouter;
