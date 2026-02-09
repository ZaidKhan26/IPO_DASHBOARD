import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../../components/MainNavbar";
import Pagination from "../../components/Pagination";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/blogs?page=${page}&limit=9`)
      .then((res) => {
        setBlogs(res.data?.data || []);
        setTotalPages(res.data?.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <MainNavbar />
      <div className="max-w-7xl mx-auto p-6 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-6 inline-block">The Bluestock Journal</span>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-950 tracking-tighter leading-[0.9]">Expert <span className="text-indigo-600">Perspectives</span> on IPOs.</h1>
          </div>
          <button
            onClick={() => navigate("/write-blog")}
            className="group bg-white border-2 border-gray-100 hover:border-indigo-600 text-gray-900 px-8 py-5 rounded-[24px] font-black transition-all duration-300 shadow-sm flex items-center gap-3 transform active:scale-95 whitespace-nowrap"
          >
            <span className="group-hover:translate-x-1 transition-transform">✍️ Write a Blog</span>
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => <div key={i} className="bg-white h-[450px] rounded-[48px] animate-pulse border border-gray-50"></div>)}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {blogs.map((b) => (
                <div
                  key={b._id}
                  onClick={() => navigate(`/blog/${b._id}`)}
                  className="cursor-pointer bg-white rounded-[48px] overflow-hidden border border-gray-100/50 shadow-sm hover:shadow-2xl hover:scale-[1.02] hover:border-indigo-100 transition-all duration-500 group flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={b.image || "https://images.unsplash.com/photo-1611974717483-3600997e57c1?q=80&w=2070&auto=format&fit=crop"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      alt={b.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent"></div>
                    <span className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">Market Insight</span>
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <h2 className="text-2xl font-black mb-4 text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                      {b.title}
                    </h2>
                    <p className="text-gray-500 font-medium text-lg line-clamp-3 mb-8 leading-relaxed">
                      {b.description || b.content}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-xs">
                          {b.author?.[0]?.toUpperCase() || "E"}
                        </div>
                        <span className="text-sm font-black text-gray-900 tracking-tight">{b.author || "Bluestock Expert"}</span>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{new Date(b.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              ))}

              {!blogs.length && !loading && (
                <div className="col-span-full py-40 text-center bg-white rounded-[64px] border-4 border-dashed border-gray-50 flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-8">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-4">The press is quiet...</h3>
                  <p className="text-gray-400 font-bold text-lg max-w-sm">No blogs found on this page.</p>
                </div>
              )}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Blog;
