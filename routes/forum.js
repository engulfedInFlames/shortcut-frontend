import express from "express";
const ForumRouter = express.Router();

const channelRegex = /^@[A-Za-z0-9]+$/;

const getInsight = (req, res) => {
  const channel = req.params.channel;
  if (!channelRegex.test(channel)) {
    res.redirect("/");
  }
  try {
    const context = {
      channelHandle: channel,
    };
    return res.render("pages/insight", context);
  } catch (e) {
    return res.send("Something Wrong!");
  }
};

const getConsortium = (req, res) => {
  const channel = req.params.channel;
  if (!channelRegex.test(channel)) {
    res.redirect("/");
  }
  try {
    const context = {
      channelHandle: channel,
    };
    return res.render("pages/consortium", context);
  } catch (e) {
    return res.send("Something Wrong!");
  }
};

const getColloquium = (req, res) => {
  const channel = req.params.channel;
  if (!channelRegex.test(channel)) {
    res.redirect("/");
  }
  try {
    const context = {
      channelHandle: channel,
    };
    return res.render("pages/colloquium", context);
  } catch (e) {
    return res.send("Something Wrong!");
  }
};

const getWrite = (req, res) => {
  const channel = req.params.channel;
  if (!channelRegex.test(channel)) {
    res.redirect("/");
  }
  try {
    const context = {
      channelHandle: channel,
    };
    return res.render("pages/write", context);
  } catch (e) {
    return res.send("Something Wrong!");
  }
};

ForumRouter.get("/:channel/insight", getInsight);
ForumRouter.get("/:channel/consortium", getConsortium);
ForumRouter.get("/:channel/colloquium", getColloquium);
ForumRouter.get("/:channel/write", getWrite);

export default ForumRouter;
