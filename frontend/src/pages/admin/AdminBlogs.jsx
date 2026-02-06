import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/blogs")
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Load blogs error:", err);
        setLoading(false);
      });
  }, []);

  const deleteBlog = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this blog?")) return;

      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await api.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete blog");
    }
  };

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 mb-4 inline-block shadow-sm">Content Management</span>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Editorial Desk.</h1>
            <p className="text-slate-400 font-medium mt-2">Manage your blog articles and content</p>
          </div>
          <button
            onClick={() => navigate("/admin/add-blog")}
            className="bg-slate-900 text-white px-8 py-5 rounded-2xl font-black transition-all hover:bg-slate-800 shadow-xl active:scale-95 flex items-center gap-3 self-start"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Blog
          </button>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-300">
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">Total Blogs</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">{blogs.length}</p>
            </div>
            <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-300">
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">Published</p>
              <p className="text-4xl font-black text-emerald-600 tracking-tighter">{blogs.length}</p>
            </div>
            <div className="bg-emerald-600 p-4 rounded-2xl text-white shadow-lg shadow-emerald-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-300">
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">This Month</p>
              <p className="text-4xl font-black text-amber-600 tracking-tighter">{Math.min(blogs.length, 5)}</p>
            </div>
            <div className="bg-amber-600 p-4 rounded-2xl text-white shadow-lg shadow-amber-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* BLOGS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white h-[280px] rounded-[40px] animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-[48px] p-16 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">No Blogs Yet</h3>
            <p className="text-slate-400 font-medium mb-8">Start creating content for your readers</p>
            <button
              onClick={() => navigate("/admin/add-blog")}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all"
            >
              Create First Blog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 group relative overflow-hidden flex flex-col"
              >
                {/* HOVER ACCENT */}
                <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full transition-all duration-500 bg-indigo-600"></div>

                {/* BLOG CONTENT */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Article</span>
                    <span className="text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                      {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-black text-xl text-slate-900 tracking-tight mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-slate-400 font-medium text-sm leading-relaxed line-clamp-3 mb-6">
                    {blog.content}
                  </p>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{blog.author || "Bluestock Expert"}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 pt-6 border-t border-slate-50">
                  <button
                    onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                    className="flex-1 bg-slate-50 text-slate-700 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="bg-red-50 text-red-600 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBlogs;
