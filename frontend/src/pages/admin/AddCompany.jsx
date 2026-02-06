import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

function AddCompany() {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!name) return alert("Company name is required");

      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      await api.post(
        "/api/companies",
        { name, logoUrl: logo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin-panel");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        {/* HEADER */}
        <div className="mb-12">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block shadow-sm">
            New Entry
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Add Company.</h1>
          <p className="text-slate-400 font-medium mt-2">Register a new company in the system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM SECTION */}
          <div className="bg-white rounded-[48px] p-10 lg:p-14 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-50">
              <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Company Details</h2>
                <p className="text-slate-400 text-sm font-medium">Fill in the information below</p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-8">
              {/* Company Name */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Reliance Industries Ltd"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                />
              </div>

              {/* Logo URL */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  Logo URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                />
                <p className="text-xs text-slate-400 mt-2 font-medium">Enter a direct link to the company logo image</p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate("/admin-panel")}
                  className="flex-1 bg-slate-50 text-slate-600 px-8 py-5 rounded-2xl font-black transition-all hover:bg-slate-100 border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black transition-all hover:bg-slate-800 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Company
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* PREVIEW SECTION */}
          <div className="bg-slate-900 rounded-[48px] p-10 lg:p-14 shadow-2xl shadow-slate-200 text-white">
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/10">
              <div className="bg-white/10 p-4 rounded-2xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">Live Preview</h2>
                <p className="text-white/40 text-sm font-medium">See how it will appear</p>
              </div>
            </div>

            {/* PREVIEW CARD */}
            <div className="bg-white/5 rounded-[32px] p-8 border border-white/10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-lg">
                  {logo ? (
                    <img src={logo} alt="Logo Preview" className="w-full h-full object-contain" onError={(e) => e.target.style.display = 'none'} />
                  ) : (
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Company Name</p>
                  <p className="text-2xl font-black tracking-tight">
                    {name || "Company Name"}
                  </p>
                </div>
              </div>
            </div>

            {/* TIPS */}
            <div className="mt-10 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Quick Tips</h3>
              <div className="flex items-start gap-4 text-white/60 text-sm">
                <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Use the official company name as registered</p>
              </div>
              <div className="flex items-start gap-4 text-white/60 text-sm">
                <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Logo should be a square image for best results</p>
              </div>
              <div className="flex items-start gap-4 text-white/60 text-sm">
                <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Use PNG format with transparent background</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCompany;
