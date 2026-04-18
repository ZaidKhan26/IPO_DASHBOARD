# IPO Dashboard

A full-stack web application for tracking and analyzing IPOs (Initial Public Offerings). Users can browse IPO listings, read market news, participate in community discussions, and read/write blog posts about the IPO market.

## Tech Stack

**Frontend:** React 19, React Router, Tailwind CSS, Firebase (Google Auth), Axios

**Backend:** Node.js, Express.js, MongoDB (Mongoose), Redis, JWT, Nodemailer

**Deployment:** Vercel (both frontend and backend)

## Features

- **IPO Listings** — Browse upcoming and past IPOs with detailed info for each
- **IPO Tracker** — Track IPO statuses and timelines
- **IPO Analysis** — View analysis data for listed IPOs
- **Real IPO Data** — Fetches live IPO data from external APIs (RapidAPI)
- **Market News** — Aggregated IPO and market news via NewsAPI / Marketaux
- **Blog System** — Users can write and read blog posts; admin can manage them
- **Community Q&A** — Ask questions, post answers, and browse discussions
- **Videos** — IPO-related video content (YouTube API)
- **Auth** — Signup/login with email + password (JWT) or Google (Firebase), with forgot/reset password via email
- **Admin Panel** — Add/edit/delete IPOs, manage companies, manage blog posts (protected routes)
- **Rate Limiting** — API rate limiting via `express-rate-limit`
- **Caching** — Redis caching for API responses (optional, toggled via env var)

## Project Structure

```
IPO-Project/
├── backend/
│   ├── config/          # DB and Redis connection
│   ├── middleware/       # Auth and admin auth middleware
│   ├── models/          # Mongoose models (User, Ipo, Blog, Company, Question, Answer, Video)
│   ├── routes/          # Express route handlers
│   ├── utils/           # Utility functions
│   ├── server.js        # Entry point
│   └── vercel.json      # Vercel deployment config
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/         # Axios API helpers
│   │   ├── components/  # Reusable React components
│   │   ├── pages/
│   │   │   ├── admin/       # Admin panel pages
│   │   │   ├── auth/        # Login, Signup, Forgot/Reset Password
│   │   │   ├── blog/        # Blog listing, detail, write, edit
│   │   │   ├── community/   # Q&A discussions
│   │   │   ├── ipo/         # Home, IPO detail, tracker, analysis, news
│   │   │   └── marketing/   # Products, Pricing, News, Videos
│   │   ├── firebase.js  # Firebase config
│   │   └── App.js       # Routes
│   └── vercel.json      # Vercel deployment config
└── .gitignore
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) — a running instance or a MongoDB Atlas connection string
- [Redis](https://redis.io/) — optional, for caching (can be disabled via env var)
- API keys for: YouTube Data API, NewsAPI / Marketaux, RapidAPI (IPO data)
- A Firebase project (for Google authentication on the frontend)

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ZaidKhan26/IPO_DASHBOARD.git
cd IPO_DASHBOARD
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
USE_REDIS=true

# API Keys
YOUTUBE_API_KEY=your_youtube_api_key
NEWS_API_KEY=your_newsapi_key
MARKETAUX_API_KEY=your_marketaux_api_key
RAPIDAPI_KEY=your_rapidapi_key
FIREBASE_API_KEY=your_firebase_api_key

# Email (for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the backend:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The backend runs on `http://localhost:5000` by default.

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_FIREBASE_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Start the frontend:

```bash
npm start
```

The frontend runs on `http://localhost:3000` by default.

### 4. Create an admin user (optional)

There's a `createAdmin.js` script in the backend folder. Update it with your desired admin credentials and run:

```bash
node createAdmin.js
```

## API Routes

| Prefix | Description |
|---|---|
| `/api/auth` | Signup, login, password reset |
| `/api/ipos` | IPO CRUD operations |
| `/api/companies` | Company management |
| `/api/blogs` | Blog CRUD |
| `/api/community` | Q&A — questions and answers |
| `/api/media` | Videos (YouTube) |
| `/api/real-ipo` | Live IPO data from external APIs |

## Environment Variables Summary

| Variable | Required | Used In | Description |
|---|---|---|---|
| `MONGO_URI` | Yes | Backend | MongoDB connection string |
| `JWT_SECRET` | Yes | Backend | Secret for signing JWTs |
| `PORT` | No | Backend | Server port (default: 5000) |
| `REDIS_URL` | No | Backend | Redis connection URL |
| `USE_REDIS` | No | Backend | Set to `true` to enable Redis caching |
| `YOUTUBE_API_KEY` | Yes | Backend | YouTube Data API key |
| `NEWS_API_KEY` | Yes | Backend | NewsAPI key |
| `MARKETAUX_API_KEY` | Yes | Backend | Marketaux API key |
| `RAPIDAPI_KEY` | Yes | Backend | RapidAPI key for IPO data |
| `EMAIL_USER` | Yes | Backend | Gmail address for sending emails |
| `EMAIL_PASS` | Yes | Backend | Gmail app password |
| `FIREBASE_API_KEY` | No | Backend | Firebase API key |
| `REACT_APP_FIREBASE_*` | Yes | Frontend | Firebase project config values |

## Deployment

Both frontend and backend include `vercel.json` files and are configured for deployment on [Vercel](https://vercel.com/). Set your environment variables in the Vercel dashboard and deploy each folder as a separate project.
