import api from "../../api/axios";
import { useEffect, useState } from "react";
import IpoCard from "../../components/IpoCard";
import MainNavbar from "../../components/MainNavbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const [customIpos, setCustomIpos] = useState([]);
  const [liveIpos, setLiveIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both custom and live IPOs in parallel
        const [customRes, liveRes] = await Promise.all([
          api.get("/api/ipo"),
          api.get("/api/real-ipo").catch(() => ({ data: { data: [] } }))
        ]);

        setCustomIpos(customRes.data);

        // Handle new response format: { source, count, data }
        const liveData = liveRes.data?.data || liveRes.data || [];
        console.log("Live IPO source:", liveRes.data?.source);
        console.log("Live IPO count:", liveRes.data?.count || liveData.length);

        setLiveIpos(Array.isArray(liveData) ? liveData : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Combine and filter IPOs
  const getFilteredIpos = () => {
    let ipos = [];

    if (activeFilter === "all") {
      ipos = [...liveIpos, ...customIpos];
    } else if (activeFilter === "live") {
      ipos = liveIpos;
    } else if (activeFilter === "custom") {
      ipos = customIpos;
    }

    // Sort: Ongoing first, then Upcoming, then Closed
    const statusOrder = { "Ongoing": 0, "Upcoming": 1, "Closed": 2 };
    return ipos.sort((a, b) => (statusOrder[a.status] || 2) - (statusOrder[b.status] || 2));
  };

  const filteredIpos = getFilteredIpos();
  const totalCount = liveIpos.length + customIpos.length;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <MainNavbar />

      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        {/* Banner Section */}
        <div className="bg-indigo-600 rounded-[48px] p-10 lg:p-16 mb-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[128px] opacity-20 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-[128px] opacity-20 -ml-20 -mb-20"></div>

          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Live Market Data
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
              Invest in the <span className="text-indigo-200">Future</span>.
              <br />
              IPO Dashboard.
            </h1>
            <p className="text-indigo-100 text-lg lg:text-xl font-medium mb-10 leading-relaxed opacity-90">
              Real-time data on upcoming IPOs, detailed financial analysis,
              and professional community insights for smarter investing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/community/discussions")}
                className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
              >
                Join Discussion
              </button>
              <button
                onClick={() => window.open("https://bluestock.in/about-us/", "_blank")}
                className="bg-indigo-500/30 text-white border border-indigo-400/30 backdrop-blur-md px-10 py-5 rounded-2xl font-black text-lg transition-all duration-300 hover:bg-indigo-500/50 hover:scale-105 active:scale-95"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block">
            <div className="w-[340px] h-[340px] bg-white/10 backdrop-blur-xl rounded-[64px] border border-white/20 p-8 transform rotate-3 flex items-center justify-center">
              <img
                src="/Scroll Media/7RFqZYlp_400x400 (1).png"
                alt="Globe Illustration"
                className="w-48 h-48 drop-shadow-2xl animate-pulse"
              />
            </div>
          </div>
        </div>

        {/* Section Header with Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Primary Market Live</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                Tracking {totalCount} IPOs ({liveIpos.length} Live, {customIpos.length} Custom)
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            {[
              { key: "all", label: "All IPOs", count: totalCount },
              { key: "live", label: "Live", count: liveIpos.length },
              { key: "custom", label: "Custom", count: customIpos.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeFilter === tab.key
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                {tab.key === "live" && <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>}
                {tab.label}
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeFilter === tab.key ? "bg-white/20" : "bg-gray-100"
                  }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* IPO Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white h-[400px] rounded-[32px] animate-pulse border border-gray-50"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredIpos.map((ipo) => (
              <IpoCard key={ipo._id} ipo={ipo} />
            ))}

            {filteredIpos.length === 0 && (
              <div className="col-span-full py-32 text-center bg-white rounded-[48px] border-4 border-dashed border-gray-50 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-gray-400 font-black text-xl tracking-tight">No IPOs found.</p>
                <p className="text-gray-300 font-medium max-w-xs mt-2">
                  {activeFilter === "live"
                    ? "No live IPOs available at the moment."
                    : activeFilter === "custom"
                      ? "No custom IPOs have been added yet."
                      : "We'll update the dashboard as soon as the market shifts."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
