import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🏠 General & Main Pages
import Home from "./pages/ipo/Home";
import IpoDetail from "./pages/ipo/IpoDetail";
import RealIpoDetail from "./pages/ipo/RealIpoDetail";
import IpoTracker from "./pages/ipo/IpoTracker";
import IpoAnalysis from "./pages/ipo/IpoAnalysis";
import MarketNews from "./pages/ipo/MarketNews";

// 🔐 Authentication
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

// 🛠️ Admin Panel
import AdminPanel from "./pages/admin/AdminPanel";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminAddIpo from "./pages/admin/AdminAddIpo";
import AddCompany from "./pages/admin/AddCompany";
import AddIpo from "./pages/admin/AddIpo";
import EditIpo from "./pages/admin/EditIpo";
import AdminBlogs from "./pages/admin/AdminBlogs";

// ✍️ Blog Section
import Blog from "./pages/blog/Blog";
import BlogDetail from "./pages/blog/BlogDetail";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";
import WriteBlog from "./pages/blog/WriteBlog";
import ExpertBlogs from "./pages/blog/ExpertBlogs";

// 👥 Community
import Community from "./pages/community/Community";
import Discussions from "./pages/community/Discussions";
import AskQuestion from "./pages/community/AskQuestion";
import QuestionDetail from "./pages/community/QuestionDetail";

// 📢 Marketing & General
import Products from "./pages/marketing/Products";
import Pricing from "./pages/marketing/Pricing";
import News from "./pages/marketing/News";
import Videos from "./pages/marketing/Videos";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Home & IPO Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/ipo/:id" element={<IpoDetail />} />
        <Route path="/real-ipo/:id" element={<RealIpoDetail />} />
        <Route path="/ipo-tracker" element={<IpoTracker />} />
        <Route path="/market-news" element={<MarketNews />} />
        <Route path="/ipo-analysis" element={<IpoAnalysis />} />

        {/* Community Routes */}
        <Route path="/community" element={<Community />} />
        <Route path="/community/discussions" element={<Discussions />} />
        <Route
          path="/community/ask"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />
        <Route path="/community/question/:id" element={<QuestionDetail />} />
        <Route path="/community/experts" element={<ExpertBlogs />} />

        {/* Blog Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route
          path="/write-blog"
          element={
            <ProtectedRoute>
              <WriteBlog />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-company"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-ipo"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddIpo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-ipo/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditIpo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminAddIpo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-blog"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-blog/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        {/* Marketing/General Routes */}
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/news" element={<News />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;