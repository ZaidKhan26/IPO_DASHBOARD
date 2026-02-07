const express = require("express");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");
const cors = require("cors");
require("dotenv").config();

const app = express();

// DB
connectDB();
connectRedis();

// Middlewares
// Middlewares
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://ipo-frontend1-mqa9hbud5-zaidkhan26s-projects.vercel.app",
    "https://ipo-frontend1.vercel.app"
  ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    console.log("Request Origin:", origin); // Troubleshooting Log

    // Check against allowed list OR dynamic Vercel preview URLs
    const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");

    if (!isAllowed) {
      console.log("CORS Blocked:", origin); // Troubleshooting Log
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/companies", require("./routes/company"));
app.use("/api/ipos", require("./routes/ipoRoutes"));
app.use("/api/ipo", require("./routes/ipoRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/media", require("./routes/media"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/community", require("./routes/community"));
app.use("/api/real-ipo", require("./routes/realIpo"));

app.get("/", (req, res) => {
  res.send("IPO Backend Running");
});

const PORT = process.env.PORT || 5000;

// Only listen if not in Vercel/Serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
