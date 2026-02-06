import api from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

function EditIpo() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/ipo/${id}`)
      .then((res) => {
        setData({
          ...res.data,
          lotSize: res.data.lotSize || 50,
          retailQuota: res.data.retailQuota || 35,
          retailSubscription: res.data.retailSubscription || 0,
          qibSubscription: res.data.qibSubscription || 0,
          ipoPrice: res.data.ipoPrice || 0,
          listingPrice: res.data.listingPrice || 0,
          listingGain: res.data.listingGain || 0,
          cmp: res.data.cmp || 0,
          currentReturn: res.data.currentReturn || 0
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load IPO data");
        setLoading(false);
      });
  }, [id]);

  const update = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await api.put(`/api/ipo/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("IPO Updated Successfully");
      navigate("/admin-panel");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to update IPO");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all duration-300 font-bold text-gray-900";
  const labelClass = "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 mb-1 block";

  if (loading) return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <AdminNavbar />
      <div className="max-w-6xl mx-auto p-10 animate-pulse bg-white rounded-[48px] mt-10 h-[600px]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        <div className="mb-12">
          <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 mb-4 inline-block shadow-sm">Listing Editor</span>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Modify {data.companyId?.name || "IPO"}.</h1>
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
                <label className={labelClass}>Company Identity (Read Only)</label>
                <input
                  value={data.companyId?.name || ""}
                  className={inputClass + " opacity-50 cursor-not-allowed"}
                  readOnly
                />
              </div>

              <div>
                <label className={labelClass}>Price Band</label>
                <input
                  value={data.priceBand || ""}
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
                    value={data.issueType || ""}
                    placeholder="Mainline"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, issueType: e.target.value })}
                  />
                  <input
                    type="number"
                    value={data.retailQuota || 35}
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
                    value={data.issueSize || ""}
                    placeholder="500"
                    className={inputClass}
                    onChange={(e) => setData({ ...data, issueSize: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Lot Size (Shares)</label>
                  <input
                    type="number"
                    value={data.lotSize || 50}
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
                    value={data.ipoPrice || 0}
                    className={inputClass}
                    onChange={(e) => setData({ ...data, ipoPrice: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Listing Price (₹)</label>
                  <input
                    type="number"
                    value={data.listingPrice || 0}
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
                    value={data.listingGain || 0}
                    className={inputClass}
                    onChange={(e) => setData({ ...data, listingGain: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className={labelClass}>CMP (₹)</label>
                  <input
                    type="number"
                    value={data.cmp || 0}
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
                    value={data.retailSubscription || 0}
                    className={inputClass}
                    onChange={(e) => setData({ ...data, retailSubscription: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className={labelClass}>QIB Sub. (x)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={data.qibSubscription || 0}
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
                    value={data.openDate || ""}
                    className={inputClass}
                    onChange={(e) => setData({ ...data, openDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Closes On</label>
                  <input
                    type="date"
                    value={data.closeDate || ""}
                    className={inputClass}
                    onChange={(e) => setData({ ...data, closeDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Listing Date</label>
                <input
                  type="date"
                  value={data.listingDate || ""}
                  className={inputClass}
                  onChange={(e) => setData({ ...data, listingDate: e.target.value })}
                />
              </div>

              <div>
                <label className={labelClass}>RHP URL</label>
                <input
                  value={data.rhpPdf || ""}
                  className={inputClass}
                  onChange={(e) => setData({ ...data, rhpPdf: e.target.value })}
                />
              </div>

              <div>
                <label className={labelClass}>Important Link</label>
                <input
                  value={data.importantLink || ""}
                  className={inputClass}
                  onChange={(e) => setData({ ...data, importantLink: e.target.value })}
                />
              </div>
            </div>

          </div>

          <div className="mt-16 pt-10 border-t border-slate-50 flex items-center justify-end">
            <button
              onClick={update}
              disabled={saving}
              className="bg-slate-900 hover:bg-indigo-600 text-white px-16 py-6 rounded-[28px] font-black text-xl transition-all duration-500 shadow-2xl shadow-indigo-100 disabled:opacity-50 flex items-center gap-3 active:scale-95 group"
            >
              {saving ? "Updating..." : "Commit Modification"}
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditIpo;
