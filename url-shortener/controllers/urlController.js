const shortid = require("shortid");
const URL = require("../models/urlSchema");

// GET
const handleGetAllURL = async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    Urls: allUrls,
  });
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
    // return res.json({ id: shortId });
  } catch (err) {
    console.error("Error creating new short URL:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// GET Redirect
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

// const handleRouting = async (req, res) => {
//   const shortId = req.params.shortId;

//   try {
//     const entry = await URL.findOneAndUpdate(
//       { shortId },
//       {
//         $push: {
//           visitHistory: { timestamp: Date.now() },
//         },
//       },
//       { new: true } // Return the updated document
//     );

//     if (!entry) {
//       return res.status(404).send("URL not found");
//     }

//     return res.redirect(entry.redirectURL);
//   } catch (err) {
//     console.error("Error during redirection:", err);
//     return res.status(500).send("Server error");
//   }
// };

// GET analytics
const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGetAllURL,
  handleGenerateNewShortURL,
  handleRouting,
  handleGetAnalytics,
};
