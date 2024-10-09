const express = require("express");
const router = express.Router();

const {
  handleGetAllURL,
  handleGenerateNewShortURL,
  handleRouting,
  handleGetAnalytics,
} = require("../controllers/urlController");

router.get("/test", handleGetAllURL);
router.post("/", handleGenerateNewShortURL);
router.get("/new/:shortId", handleRouting);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
