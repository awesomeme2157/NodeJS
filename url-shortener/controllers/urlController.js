const shortid = require("shortid");
const URL = require("../models/urlSchema");

// GET all urls
const handleGetAllURL = async (req, res) => {
  const allUrls = await URL.find({});

  res.render("home", { urls: allUrls });
};

// POST
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

    return res.render("home", {
      id: shortId,
    });
  } catch (err) {
    console.error("Error creating new short URL:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// GET Redirect
const handleRouting = async (req, res) => {
  try {
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

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Error during redirection:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


// GET analytics
const handleGetAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  handleGetAllURL,
  handleGenerateNewShortURL,
  handleRouting,
  handleGetAnalytics,
};
