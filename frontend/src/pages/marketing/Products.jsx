import MainNavbar from "../../components/MainNavbar";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  const products = [
    {
      title: "IPO Tracker",
      desc: "Comprehensive dashboard tracking upcoming, active, and closed IPOs with real-time subscription data.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "bg-indigo-600",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      route: "/ipo-tracker"
    },
    {
      title: "Market Intelligence",
      desc: "Deep-dive analysis of primary and secondary market trends with expert insights and sentiment scoring.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "bg-rose-600",
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
      route: "/market-news"
    },
    {
      title: "Bluestock Academy",
      desc: "Master the art of investing with our curated selection of courses and financial literacy workshops.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      route: "#"
    },
    {
      title: "Wealth Navigator",
      desc: "Intelligent portfolio tracking and risk assessment tools tailored for high-growth potential assets.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 20l-5.447-2.724A2 2 0 013 15.488V5.012a2 2 0 011.553-1.954L9 1.488l5.447 2.724A2 2 0 0116 6.16v10.452a2 2 0 01-1.553 1.954L9 20z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 20V1.488" />
        </svg>
      ),
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      route: "#"
    },
    {
      title: "Mutual Fund Radar",
      desc: "Detailed comparison and screening tools for top-performing direct and regular mutual funds.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: "bg-amber-600",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
      route: "#"
    },
    {
      title: "Tax Strategist",
      desc: "Automated assistance for tax saving investments and straightforward filing processes for all tax brackets.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      route: "#"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <MainNavbar />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-32">
          <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.4em] px-6 py-2.5 rounded-full mb-8 inline-block shadow-xl shadow-indigo-100 italic">Ecosystem</span>
          <h1 className="text-6xl lg:text-[100px] font-black text-slate-950 tracking-tighter leading-[0.85] mb-8">
            Superior Tools for <span className="text-indigo-600 underline decoration-indigo-200">Modern</span> Investors.
          </h1>
          <p className="text-slate-500 font-medium text-xl lg:text-2xl leading-relaxed">
            From IPO tracking to complex market analysis, Bluestock delivers the intelligence you need to outpace the market.
          </p>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <div
              key={i}
              onClick={() => p.route !== "#" && navigate(p.route)}
              className="bg-white rounded-[48px] p-10 lg:p-14 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-700 cursor-pointer group relative overflow-hidden"
            >
              {/* HOVER ACCENT */}
              <div className={`absolute top-0 left-0 w-2 h-0 group-hover:h-full transition-all duration-700 ${p.color}`}></div>

              <div className={`w-20 h-20 ${p.lightColor} ${p.textColor} rounded-[32px] flex items-center justify-center mb-10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110`}>
                {p.icon}
              </div>

              <h3 className="text-3xl font-black text-slate-950 tracking-tighter mb-4">
                {p.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                {p.desc}
              </p>

              <div className="flex items-center gap-3">
                <span className={`font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${p.textColor}`}>
                  {p.route === "#" ? "Coming Soon" : "Get Started"}
                </span>
                <svg className={`w-5 h-5 ${p.textColor} transform group-hover:translate-x-2 transition-transform duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 p-16 lg:p-24 bg-slate-950 rounded-[64px] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-10 relative z-10">
            One Platform. Unlimited <span className="text-indigo-500">Alpha.</span>
          </h2>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-slate-950 px-16 py-6 rounded-[28px] font-black text-xl transition-all duration-500 shadow-2xl hover:bg-indigo-600 hover:text-white transform active:scale-95 relative z-10"
          >
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
