import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainNavbar from "../../components/MainNavbar";
import BrokerModal from "../../components/BrokerModal";

function RealIpoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ipo, setIpo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showBrokerModal, setShowBrokerModal] = useState(false);

    useEffect(() => {
        api
            .get(`/api/real-ipo/${id}`)
            .then((res) => {
                setIpo(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="bg-[#F8FAFC] min-h-screen">
                <MainNavbar />
                <div className="max-w-5xl mx-auto p-6 lg:p-10">
                    <div className="bg-white rounded-[48px] h-[600px] animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (!ipo) {
        return (
            <div className="bg-[#F8FAFC] min-h-screen">
                <MainNavbar />
                <div className="max-w-5xl mx-auto p-6 lg:p-10 text-center py-32">
                    <h2 className="text-3xl font-black text-gray-900">IPO Not Found</h2>
                    <p className="text-gray-400 mt-2">This IPO may no longer be available.</p>
                    <button
                        onClick={() => navigate("/home")}
                        className="mt-6 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            <MainNavbar />

            <div className="max-w-5xl mx-auto p-6 lg:p-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold mb-8 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to IPO List
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-[48px] p-8 lg:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
                    {/* LIVE Badge */}
                    <div className="absolute top-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Live IPO
                    </div>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start gap-8 mb-10 pb-10 border-b border-gray-50">
                        <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center p-4 border border-gray-100 shadow-sm">
                            <img
                                src={ipo.companyId?.logoUrl}
                                alt="Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter mb-2">
                                {ipo.companyId?.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 mt-4">
                                <span className={`px-4 py-2 rounded-full text-sm font-bold ${ipo.status === "Ongoing"
                                    ? "bg-green-50 text-green-600 border border-green-100"
                                    : ipo.status === "Upcoming"
                                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                                        : "bg-red-50 text-red-600 border border-red-100"
                                    }`}>
                                    {ipo.status}
                                </span>
                                <span className="text-gray-400 font-bold text-sm">{ipo.issueType}</span>
                            </div>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <div className="bg-gray-50 rounded-3xl p-6">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Price Band</p>
                            <p className="text-2xl font-black text-gray-900">{ipo.priceBand || "TBD"}</p>
                        </div>
                        <div className="bg-gray-50 rounded-3xl p-6">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Lot Size</p>
                            <p className="text-2xl font-black text-gray-900">{ipo.lotSize || "TBD"} <span className="text-sm text-gray-400">shares</span></p>
                        </div>
                        <div className="bg-gray-50 rounded-3xl p-6">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Issue Size</p>
                            <p className="text-2xl font-black text-gray-900">₹{ipo.issueSize || "TBD"} <span className="text-sm text-gray-400">Cr</span></p>
                        </div>
                        <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
                            <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-2">GMP</p>
                            <p className="text-2xl font-black text-emerald-600">{ipo.gmp || "TBD"}</p>
                            {ipo.gmpPercent && <p className="text-emerald-500 text-sm font-bold">{ipo.gmpPercent}</p>}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="bg-indigo-50 rounded-3xl p-8 mb-10 border border-indigo-100">
                        <h3 className="text-lg font-black text-indigo-900 mb-6 uppercase tracking-wider text-sm">Important Dates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-indigo-400 text-xs font-bold uppercase mb-1">Open Date</p>
                                <p className="text-xl font-black text-indigo-900">{ipo.openDate || "TBA"}</p>
                            </div>
                            <div>
                                <p className="text-indigo-400 text-xs font-bold uppercase mb-1">Close Date</p>
                                <p className="text-xl font-black text-indigo-900">{ipo.closeDate || "TBA"}</p>
                            </div>
                            <div>
                                <p className="text-indigo-400 text-xs font-bold uppercase mb-1">Listing Date</p>
                                <p className="text-xl font-black text-indigo-900">{ipo.listingDate || "TBA"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Data */}
                    {ipo.subscription && (ipo.subscription.retail || ipo.subscription.total) && (
                        <div className="bg-slate-900 rounded-3xl p-8 mb-10 text-white">
                            <h3 className="text-lg font-black mb-6 uppercase tracking-wider text-sm text-slate-400">Subscription Status</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Retail</p>
                                    <p className="text-2xl font-black">{ipo.subscription.retail || "-"}x</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">QIB</p>
                                    <p className="text-2xl font-black">{ipo.subscription.qib || "-"}x</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">NII</p>
                                    <p className="text-2xl font-black">{ipo.subscription.nii || "-"}x</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Total</p>
                                    <p className="text-2xl font-black text-emerald-400">{ipo.subscription.total || "-"}x</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Apply Section */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => setShowBrokerModal(true)}
                            className="flex-1 bg-emerald-500 text-white py-5 px-8 rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Apply via Broker
                        </button>
                        {ipo.rhpLink && (
                            <a
                                href={ipo.rhpLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-100 text-gray-700 py-5 px-8 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download RHP
                            </a>
                        )}
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p className="font-bold text-amber-800 mb-1">Disclaimer</p>
                            <p className="text-amber-700 text-sm">
                                This is for informational purposes only. Please read the RHP/DRHP before investing.
                                GMP (Grey Market Premium) is unofficial and subject to change. We are not SEBI registered advisors.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Broker Modal */}
            <BrokerModal
                isOpen={showBrokerModal}
                onClose={() => setShowBrokerModal(false)}
                ipoName={ipo.companyId?.name}
                brokerLinks={ipo.brokerLinks}
            />
        </div>
    );
}

export default RealIpoDetail;
