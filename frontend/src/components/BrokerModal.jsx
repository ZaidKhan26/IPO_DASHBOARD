// import { useState } from "react";

function BrokerModal({ isOpen, onClose, ipoName, brokerLinks }) {
    if (!isOpen) return null;

    const defaultBrokers = [
        {
            name: "Zerodha",
            logo: "https://zerodha.com/static/images/logo.svg",
            applyUrl: "https://console.zerodha.com/portfolio/ipo",
            color: "#387ed1",
            desc: "India's largest broker"
        },
        {
            name: "Groww",
            logo: "https://groww.in/logo-groww512.png",
            applyUrl: "https://groww.in/ipo",
            color: "#00d09c",
            desc: "Easy & user-friendly"
        },
        {
            name: "Upstox",
            logo: "https://assets.upstox.com/content/assets/images/header/upstox-logo.svg",
            applyUrl: "https://upstox.com/ipo/",
            color: "#9c27b0",
            desc: "Pro trading platform"
        },
        {
            name: "Angel One",
            logo: "https://www.angelone.in/images/logo.svg",
            applyUrl: "https://www.angelone.in/ipo",
            color: "#e82551",
            desc: "Free Demat account"
        },
        {
            name: "HDFC Sky",
            logo: "https://www.hdfcsky.com/assets/images/logo.svg",
            applyUrl: "https://www.hdfcsky.com/ipo",
            color: "#004c8f",
            desc: "Trusted banking partner"
        }
    ];

    const brokers = brokerLinks || defaultBrokers;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-[48px] p-8 lg:p-12 w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                    <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Apply for IPO</h2>
                    <p className="text-slate-400 font-medium">
                        {ipoName ? `Apply for ${ipoName} via your preferred broker` : "Select your broker to apply"}
                    </p>
                </div>

                {/* Broker Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {brokers.map((broker, i) => (
                        <a
                            key={i}
                            href={broker.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-5 bg-slate-50 hover:bg-white border-2 border-slate-100 hover:border-indigo-200 rounded-2xl transition-all duration-300 hover:shadow-lg"
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center p-2 bg-white shadow-sm group-hover:scale-110 transition-transform"
                                style={{ borderColor: broker.color, borderWidth: 2 }}
                            >
                                <img
                                    src={broker.logo}
                                    alt={broker.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.innerHTML = `<span class="text-lg font-black" style="color: ${broker.color}">${broker.name.charAt(0)}</span>`;
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-black text-slate-900 text-lg">{broker.name}</p>
                                <p className="text-slate-400 text-sm font-medium">{broker.desc || "Apply Now"}</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Info */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-600 mb-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-bold text-sm uppercase tracking-wider">How to Apply</span>
                    </div>
                    <p className="text-amber-700 text-sm font-medium">
                        You'll need an active Demat account with the broker. Apply using UPI or ASBA method.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BrokerModal;
