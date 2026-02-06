const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// ======================
// 🔐 RATE LIMITER
// ======================
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // max 30 requests per IP
  message: "Too many requests. Please try later.",
});

// Apply limiter ONLY to media routes
router.use(limiter);

// ======================
// BLOG ROUTE
// ======================
router.get("/blog", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=ipo&language=en&apiKey=${process.env.NEWS_API_KEY}`,
      { timeout: 8000 },
    );

    const blogs = (response.data.articles || []).map((a) => ({
      title: a.title || "No title",
      description: a.description || "",
      url: a.url,
    }));

    res.json(blogs);
  } catch (err) {
    console.error("BLOG fetch failed:", err.message);
    res.status(502).json({ msg: "External news service unavailable" });
  }
});

// ======================
// NEWS ROUTE
// ======================
router.get("/news", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.marketaux.com/v1/news/all?symbols=IPO&language=en&api_token=${process.env.MARKETAUX_API_KEY}`,
      { timeout: 8000 },
    );

    // Transform API response to match frontend expected format
    const newsItems = (response.data.data || []).map((item, index) => ({
      _id: item.uuid || `news-${index}`,
      title: item.title || "No title",
      link: item.url || "#",
      author: item.source || "Unknown Source",
      pubDate: item.published_at || new Date().toISOString(),
    }));

    res.json(newsItems);
  } catch (err) {
    console.error("NEWS fetch failed:", err.message);
    res.status(502).json({ msg: "External market news service unavailable" });
  }
});

// ======================
// VIDEOS ROUTE
// ======================
router.get("/videos", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        timeout: 8000,
        params: {
          part: "snippet",
          q: "IPO stock market india",
          maxResults: 12,
          type: "video",
          key: process.env.YOUTUBE_API_KEY,
        },
      },
    );

    // Transform YouTube API response to match frontend expected format
    const videos = (response.data.items || []).map((item) => ({
      _id: item.id?.videoId || item.id,
      youtubeId: item.id?.videoId || item.id,
      title: item.snippet?.title || "No title",
    }));

    res.json(videos);
  } catch (err) {
    console.error("VIDEO fetch failed:", err.message);
    res.status(502).json({ msg: "External video service unavailable" });
  }
});

module.exports = router;
