const shortid = require("shortid");
const URL = require("../models/urlSchema");

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;

  if (!body.URL) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = shortid.generate();

  try {
    await URL.create({
      shortId: shortId,
      redirectURL: body.URL,
      visitHistory: [],
    });

    return res.status(201).json({ id: shortId });
  } catch (err) {
    console.error("Error creating new short URL:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleRouting = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortURL,
  handleRouting,
  handleGetAnalytics,
};
