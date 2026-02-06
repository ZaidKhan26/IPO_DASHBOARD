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

export default function IpoAnalysis() {
  const { id } = useParams();
  const [ipo, setIpo] = useState(null);

  useEffect(() => {
    if (!id) return;

    api
      .get(`/api/ipo/${id}`)
      .then((res) => setIpo(res.data))
      .catch((err) => {
        console.error("IPO Analysis fetch error:", err);
        alert("Failed to load IPO analysis data");
      });
  }, [id]);

  if (!ipo) return <div className="p-10 text-center">Loading IPO Analysis...</div>;

  // Generate stable random subscription data
  const randomRetail = getSeededRandom(ipo._id + "retail", 1.2, 48.5);
  const randomQIB = getSeededRandom(ipo._id + "qib", 5.0, 120.0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <MainNavbar />
      <div className="max-w-7xl mx-auto p-6 pt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Info */}
          <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center p-3 border">
                <img
                  src={ipo.companyId?.logoUrl || "https://placehold.co/100x100?text=LOGO"}
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">{ipo.companyId?.name}</h1>
                <div className="flex gap-2 mt-2">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {ipo.status}
                  </span>
                  <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {ipo.issueType || "Mainline IPO"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-50 mb-10">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">Price Band</p>
                <p className="text-lg font-bold text-gray-800">{ipo.priceBand || "TBD"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">Issue Size</p>
                <p className="text-lg font-bold text-gray-800">₹{ipo.issueSize || "0"} Cr</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">Lot Size</p>
                <p className="text-lg font-bold text-gray-800">{ipo.lotSize || "50"} Shares</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">Listing Date</p>
                <p className="text-lg font-bold text-gray-800">
                  {ipo.listingDate ? new Date(ipo.listingDate).toLocaleDateString() : "TBD"}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-primary">Our Expert Analysis</h2>
            <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed text-lg">
              <p className="mb-4">
                {ipo.companyId?.name || "The company"} is entering the market with an IPO price of ₹{ipo.ipoPrice || "TBD"} and a current market price (CMP) of ₹{ipo.cmp || "TBD"}.
                This represents a current return of {ipo.currentReturn || "0"}%.
                Our experts suggest closely monitoring the listing gain of {ipo.listingGain || "0"}% as a key indicator of market sentiment.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-3 items-start">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Listing on {ipo.listingDate ? new Date(ipo.listingDate).toLocaleDateString() : "the announced date"}.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Retail Quota set at {ipo.retailQuota || "35"}% of the issue.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-indigo-500 font-bold">ℹ</span>
                  <span>Detailed RHP is available <a href={ipo.rhpPdf} target="_blank" rel="noreferrer" className="text-indigo-600 underline">here</a>.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Subscription Status</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-gray-600">Retail</span>
                    <span className="text-indigo-600">{randomRetail}x</span>
                  </div>
                  <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min(randomRetail * 2, 100)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-gray-600">QIB</span>
                    <span className="text-indigo-600">{randomQIB}x</span>
                  </div>
                  <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min(randomQIB / 1.5, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
              <h3 className="text-2xl font-bold mb-4 leading-tight">Ready to invest in this IPO?</h3>
              <p className="text-indigo-100 mb-8 font-medium">Connect with top brokers and enjoy zero brokerage on IPO applications.</p>
              <button className="w-full bg-white text-indigo-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition active:scale-95 shadow-lg">
                Applied via Bluestock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
