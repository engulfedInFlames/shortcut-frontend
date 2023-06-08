import express from "express";
const ForumRouter = express.Router();

const getCommunity = (req, res) => {
  try {
    return res.render("forum/community");
  } catch (e) {
    return res.send("Something Wrong!");
  }
};

ForumRouter.get("/@channel/community", getCommunity);

export default ForumRouter;
