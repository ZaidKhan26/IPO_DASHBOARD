import api from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

function AddIpo() {
  const [companies, setCompanies] = useState([]);
  const [data, setData] = useState({
    status: "Upcoming",
    issueType: "Mainline",
    ipoPrice: 0,
    listingPrice: 0,
    listingGain: 0,
    cmp: 0,
    currentReturn: 0,
    lotSize: 50,
    retailQuota: 35,
    retailSubscription: 0,
    qibSubscription: 0
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => {
        console.error("Failed to load companies:", err);
        alert("Failed to load companies for dropdown.");
      });
  }, []);

  const submit = async () => {
    try {
      if (!data.companyId) return alert("Please select a company");
      setLoading(true);

      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await api.post("/api/ipo", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("IPO Added Successfully");
      navigate("/admin-panel");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add IPO");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all duration-300 font-bold text-gray-900";
  const labelClass = "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 mb-1 block";

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        <div className="mb-12">
          <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 mb-4 inline-block shadow-sm">Listing Manager</span>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Initialize New IPO.</h1>
        </div>

        <div className="bg-white rounded-[48px] p-10 lg:p-16 shadow-2xl shadow-indigo-100/50 border border-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* COLUMN 1: BASIC INFO */}
            <div className="space-y-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                Core Details
              </h3>

              <div>
                <label className={labelClass}>Corporate Identity</label>
                <select
                  className={inputClass}
                  onChange={(e) => setData({ ...data, companyId: e.target.value })}
                >
                  <option value="">Select Company...</option>
                  {companies.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Price Band (Market Range)</label>
                <input
                  placeholder="e.g. ₹585 - ₹610"
                  className={inputClass}
                  onChange={(e) => setData({ ...data, priceBand: e.target.value })}
                />
              </div>

              <div>
                <label className={labelClass}>Market Status</label>
                <select
                  className={inputClass}
                  value={data.status}
                  onChange={(e) => setData({ ...data, status: e.target.value })}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Issue Type & Quota</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="Mainline"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, issueType: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Retail % (e.g. 35)"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, retailQuota: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            {/* COLUMN 2: FINANCIAL METRICS */}
            <div className="space-y-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                Valuation Metrics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Issue Size (Cr)</label>
                  <input
                    placeholder="500"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, issueSize: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Lot Size (Shares)</label>
                  <input
                    type="number"
                    placeholder="50"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, lotSize: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>IPO Price (₹)</label>
                  <input
                    type="number"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, ipoPrice: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Listing Price (₹)</label>
                  <input
                    type="number"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, listingPrice: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Listing Gain (%)</label>
                  <input
                    type="number"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, listingGain: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className={labelClass}>CMP (₹)</label>
                  <input
                    type="number"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, cmp: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Retail Sub. (x)</label>
                  <input
                    type="number"
                    step="0.01"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, retailSubscription: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className={labelClass}>QIB Sub. (x)</label>
                  <input
                    type="number"
                    step="0.01"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, qibSubscription: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            {/* COLUMN 3: TIMELINE & ASSETS */}
            <div className="space-y-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <div className="w-1.5 h-6 bg-emerald-600 rounded-full"></div>
                Calendar & Documents
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Opens On</label>
                  <input
                    type="date"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, openDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Closes On</label>
                  <input
                    type="date"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, closeDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Listing Probability Date</label>
                <input
                  type="date"
                  className={inputClass}
                  onChange={(e) => setData({ ...data, listingDate: e.target.value })}
                />
              </div>

              <div>
                <label className={labelClass}>RHP Document URL</label>
                <input
                  placeholder="https://..."
                  className={inputClass}
                  onChange={(e) => setData({ ...data, rhpPdf: e.target.value })}
                />
              </div>

              <div>
                <label className={labelClass}>External Official Link</label>
                <input
                  placeholder="https://registrar.com/..."
                  className={inputClass}
                  onChange={(e) => setData({ ...data, importantLink: e.target.value })}
                />
              </div>
            </div>

          </div>

          <div className="mt-16 pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-slate-400 font-bold text-sm max-w-sm">
              Ensure all financial figures are cross-verified with the official RHP document before publishing to the live market dashboard.
            </div>
            <button
              onClick={submit}
              disabled={loading}
              className="bg-indigo-600 hover:bg-slate-900 text-white px-16 py-6 rounded-[28px] font-black text-xl transition-all duration-500 shadow-2xl shadow-indigo-100 disabled:opacity-50 flex items-center gap-3 active:scale-95 group"
            >
              {loading ? "Initializing..." : "Publish IPO Listing"}
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddIpo;
