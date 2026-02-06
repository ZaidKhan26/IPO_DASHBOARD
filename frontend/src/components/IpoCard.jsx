import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BrokerModal from "./BrokerModal";

function IpoCard({ ipo }) {
  const navigate = useNavigate();
  const [showBrokerModal, setShowBrokerModal] = useState(false);

  const isLive = ipo.isLive === true;

  const handleClick = () => {
    if (isLive) {
      navigate(`/real-ipo/${ipo._id}`);
    } else {
      navigate(`/ipo/${ipo._id}`);
    }
  };

  const handleApply = (e) => {
    e.stopPropagation();
    setShowBrokerModal(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 cursor-pointer group relative overflow-hidden"
      >
        {/* LIVE/CUSTOM Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 ${isLive
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100"
            : "bg-slate-100 text-slate-500"
          }`}>
          {isLive && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
          {isLive ? "LIVE" : "CUSTOM"}
        </div>

        <div className="flex items-start justify-between mb-6 mt-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-50 group-hover:scale-110 transition-transform duration-500">
              <img
                src={ipo.companyId?.logoUrl || "https://placehold.co/100x100?text=LOGO"}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors pr-16">
                {ipo.companyId?.name || "Company Name"}
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                {ipo.issueType || "Mainline IPO"}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm
            ${ipo.status === "Upcoming"
                ? "bg-blue-50 text-blue-600 border border-blue-100"
                : ipo.status === "Ongoing"
                  ? "bg-green-50 text-green-600 border border-green-100"
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}
          >
            {ipo.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-5 mb-6 py-5 border-y border-gray-50">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Price Band</p>
            <p className="text-sm font-black text-gray-800 tracking-tight">
              {ipo.priceBand || "TBD"}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Lot Size</p>
            <p className="text-sm font-black text-gray-800 tracking-tight">{ipo.lotSize || "TBD"} Shares</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Issue Size</p>
            <p className="text-sm font-black text-gray-800 tracking-tight">₹{ipo.issueSize || "0"} Cr</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">
              {isLive && ipo.gmp ? "GMP" : "Listing Gain"}
            </p>
            <p className={`text-sm font-black tracking-tight ${(ipo.gmp || ipo.listingGain) ? "text-green-500" : "text-gray-400"
              }`}>
              {isLive && ipo.gmp
                ? ipo.gmp
                : ipo.listingGain
                  ? `+${ipo.listingGain}%`
                  : "TBD"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {isLive ? (
          <div className="flex gap-3">
            <button
              className="flex-1 bg-gray-50 text-gray-900 font-bold py-4 rounded-2xl group-hover:bg-gray-100 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
            >
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={handleApply}
              className="bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl hover:bg-emerald-600 transition-all duration-300 transform active:scale-95 flex items-center gap-2 shadow-lg shadow-emerald-100"
            >
              Apply
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        ) : (
          <button className="w-full bg-gray-50 text-gray-900 font-bold py-4 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2">
            Analyze IPO
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        )}
      </div>

      {/* Broker Modal */}
      <BrokerModal
        isOpen={showBrokerModal}
        onClose={() => setShowBrokerModal(false)}
        ipoName={ipo.companyId?.name}
        brokerLinks={ipo.brokerLinks}
      />
    </>
  );
}

export default IpoCard;
