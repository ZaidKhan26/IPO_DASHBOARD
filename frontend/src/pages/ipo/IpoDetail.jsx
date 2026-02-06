import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainNavbar from "../../components/MainNavbar";

// Helper for stable random numbers based on ID
const getSeededRandom = (seed, min, max) => {
  if (!seed) return min;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const x = Math.sin(hash) * 10000;
  const rand = x - Math.floor(x);
  return parseFloat((rand * (max - min) + min).toFixed(1));
};

function IpoDetail() {
  const { id } = useParams();
  const [ipo, setIpo] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/ipo/${id}`)
      .then((res) => {
        setIpo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <MainNavbar />
      <div className="max-w-7xl mx-auto p-10 animate-pulse">
        <div className="h-64 bg-white rounded-[48px] border border-gray-50 mb-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 h-96 bg-white rounded-[48px] border border-gray-50"></div>
          <div className="h-96 bg-white rounded-[48px] border border-gray-50"></div>
        </div>
      </div>
    </div>
  );

  if (!ipo) return <div className="p-10 text-center font-black text-gray-400">IPO NOT FOUND</div>;

  // Generate stable random subscription data
  const randomRetail = getSeededRandom(ipo._id + "retail", 1.2, 48.5);
  const randomQIB = getSeededRandom(ipo._id + "qib", 5.0, 120.0);
  const totalSub = parseFloat((randomRetail + randomQIB).toFixed(1));

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <MainNavbar />
      <div className="max-w-7xl mx-auto p-6 lg:p-12">
        {/* HEADER CARD */}
        <div className="bg-white rounded-[48px] p-10 lg:p-16 mb-12 shadow-sm border border-gray-50 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10 w-full lg:w-auto">
            <div className="w-32 h-32 lg:w-48 lg:h-48 bg-gray-50 rounded-[40px] p-6 flex items-center justify-center border border-gray-100 shadow-xl shadow-indigo-50/50 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <img src={ipo.companyId?.logoUrl} alt="logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-center lg:text-left">
              <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-6 inline-block shadow-lg shadow-indigo-100 italic">NSE & BSE LISTED</span>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-950 tracking-tighter leading-[0.9] mb-4">
                {ipo.companyId?.name} <span className="text-indigo-600">IPO</span>
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest border-r border-gray-100 pr-5">Primary Market Listing</span>
                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest border-r border-gray-100 pr-5">Retail Quota: {ipo.retailQuota || "35"}%</span>
                <span className="text-indigo-600 font-black uppercase text-xs tracking-widest">{ipo.issueType || "Mainline"}</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col gap-4 relative z-10">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-6 rounded-[28px] font-black text-xl transition-all duration-300 shadow-2xl shadow-indigo-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
              Apply for IPO
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60">Listing on {new Date(ipo.listingDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-10">
            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Price Band", val: "₹" + (ipo.priceBand || "TBD"), sub: "Per Share", color: "text-indigo-600" },
                { label: "Issue Size", val: "₹" + (ipo.issueSize || "0") + " Cr", sub: "Fresh Issue", color: "text-gray-900" },
                { label: "Lot Size", val: (ipo.lotSize || "50") + " Shares", sub: "Minimum Application", color: "text-gray-900" }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50 hover:shadow-xl transition-all duration-500">
                  <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                  <p className={`text-3xl font-black tracking-tighter mb-1 ${stat.color}`}>{stat.val}</p>
                  <p className="text-gray-300 text-[10px] font-bold uppercase">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white p-12 lg:p-16 rounded-[64px] shadow-sm border border-gray-50">
              <h3 className="text-3xl font-black text-gray-950 tracking-tighter mb-10 flex items-center gap-4">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                Business Model & Overview
              </h3>
              <div className="prose prose-indigo max-w-none text-gray-500 font-medium text-lg leading-relaxed space-y-8">
                <p>Investigate {ipo.companyId?.name || "the company"}'s upcoming market entry in detail. This IPO presents a unique opportunity in the current primary market landscape. Founded on principles of innovation and scalability, the firm has demonstrated consistent growth metrics over the previous fiscal quarters.</p>
                <p>The proceed from this public offer (approx. ₹{ipo.issueSize || "0"} Cr) will be utilized for debt repayment, general corporate purposes, and strategic expansion into emerging tier-2 markets across the domestic geography.</p>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-10">
            {/* TIMELINE */}
            <div className="bg-gray-950 p-12 rounded-[56px] text-white shadow-2xl shadow-gray-200">
              <h4 className="text-2xl font-black tracking-tighter mb-10">Event Timeline</h4>
              <div className="space-y-10 relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-white/10"></div>
                {[
                  { label: "IPO Opens", date: ipo.openDate, active: true },
                  { label: "IPO Closes", date: ipo.closeDate, active: true },
                  { label: "Basis of Allotment", date: "TBD", active: false },
                  { label: "Listing Date", date: ipo.listingDate, active: false }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 relative z-10 group">
                    <div className={`w-8 h-8 rounded-full border-4 border-gray-950 shadow-xl transition-all duration-500 ${item.active ? 'bg-indigo-500 scale-125' : 'bg-gray-800 group-hover:bg-gray-700'}`}></div>
                    <div>
                      <p className={`font-black text-xs uppercase tracking-widest mb-1 ${item.active ? 'text-indigo-400' : 'text-gray-600'}`}>{item.label}</p>
                      <p className={`text-xl font-black tracking-tight ${item.active ? 'text-white' : 'text-gray-500'}`}>
                        {item.date && item.date !== "TBD" ? new Date(item.date).toLocaleDateString() : "TBD"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBSCRIPTION DATA (PSEUDO-RANDOM) */}
            <div className="bg-white p-12 rounded-[56px] border border-gray-50 shadow-sm relative overflow-hidden group">
              <div className="relative z-10 text-center">
                <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-10">Live Subscription</p>
                <div className="relative inline-block mb-10">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset={364.4 - (Math.min(totalSub, 100) / 100 * 364.4)} className="text-indigo-600 transition-all duration-1000 group-hover:stroke-indigo-500" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-gray-950 tracking-tighter">
                      {totalSub}x
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 font-bold mb-4 italic">
                  {totalSub > 50 ? "Massive Over-subscription" : totalSub > 10 ? "Highly Over-subscribed" : "Moderately Subscribed"}
                </p>
                <div className="flex justify-between items-center bg-gray-50 p-6 rounded-3xl">
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400">Retail</p>
                    <p className="text-xl font-black text-gray-950">{randomRetail}x</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400">QIB</p>
                    <p className="text-xl font-black text-gray-950">{randomQIB}x</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IpoDetail;
