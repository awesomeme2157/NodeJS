const express = require("express");
const router = express.Router();

const {
  handleGenerateNewShortURL,
  handleRouting,
  handleGetAnalytics,
} = require("../controllers/urlController");

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleRouting);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
