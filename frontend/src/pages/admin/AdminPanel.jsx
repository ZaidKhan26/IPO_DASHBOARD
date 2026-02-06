import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../../components/MainNavbar";

function AdminPanel() {
  const [ipos, setIpos] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, iRes, bRes] = await Promise.all([
          api.get("/api/companies"),
          api.get("/api/ipo"),
          api.get("/api/blogs")
        ]);
        setCompanies(cRes.data);
        setIpos(iRes.data);
        setBlogs(bRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <MainNavbar showAdmin={false} />

      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 mb-4 inline-block shadow-sm">Internal Access</span>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Command Control.</h1>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/add-ipo")}
              className="bg-slate-900 text-white px-8 py-5 rounded-2xl font-black transition-all hover:bg-slate-800 shadow-xl active:scale-95 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              New IPO
            </button>
            <button
              onClick={() => navigate("/add-company")}
              className="bg-white text-slate-900 border border-slate-200 px-8 py-5 rounded-2xl font-black transition-all hover:bg-slate-50 shadow-sm active:scale-95 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" /></svg>
              Add Company
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: "Active Companies", val: companies.length, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5", color: "bg-blue-600" },
            { label: "Market Listings", val: ipos.length, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "bg-indigo-600" },
            { label: "Blog Articles", val: blogs.length, icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", color: "bg-emerald-600" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">{stat.label}</p>
                <p className="text-5xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
              </div>
              <div className={`${stat.color} p-5 rounded-[28px] text-white shadow-xl shadow-indigo-100`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} /></svg>
              </div>
            </div>
          ))}
        </div>

        {/* LISTINGS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* RECENT IPOS */}
          <div className="bg-white rounded-[48px] p-10 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Market Listings</h2>
              <span className="text-indigo-600 font-bold text-xs">Recently Added</span>
            </div>
            <div className="space-y-4">
              {ipos.length === 0 && <p className="text-center py-10 font-bold text-slate-300">No IPOs found</p>}
              {ipos.slice(0, 6).map((ipo) => (
                <div key={ipo._id} className="group flex items-center justify-between p-6 bg-slate-50 hover:bg-indigo-50 rounded-[32px] transition-all duration-300 border border-transparent hover:border-indigo-100">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                      <img src={ipo.companyId?.logoUrl || "https://placehold.co/100"} alt="logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-lg leading-tight tracking-tight">{ipo.companyId?.name || "Company"}</p>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1 group-hover:text-indigo-600">{ipo.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/edit-ipo/${ipo._id}`)}
                    className="bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-2xl font-black text-xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT BLOGS */}
          <div className="bg-slate-900 rounded-[48px] p-10 shadow-2xl shadow-slate-200 text-white">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
              <h2 className="text-2xl font-black tracking-tighter">Editorial Desk</h2>
              <button onClick={() => navigate("/admin/blogs")} className="text-indigo-400 font-bold text-xs hover:text-indigo-300">Manage All &rarr;</button>
            </div>
            <div className="space-y-4">
              {blogs.length === 0 && <p className="text-center py-10 font-bold text-slate-700">No blogs published</p>}
              {blogs.slice(0, 6).map((blog) => (
                <div key={blog._id} className="group flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 rounded-[32px] transition-all duration-300">
                  <div className="flex-1 mr-6">
                    <p className="font-black text-white text-lg line-clamp-1 tracking-tight mb-1">{blog.title}</p>
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-widest italic">By {blog.author || "Bluestock Expert"}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
