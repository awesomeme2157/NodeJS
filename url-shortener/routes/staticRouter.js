const express = require("express");
const URL = require("../models/urlSchema");

const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

module.exports = router;
