import { useNavigate } from "react-router-dom";
import MainNavbar from "../../components/MainNavbar";

function Community() {
  const navigate = useNavigate();

  const communityFeatures = [
    {
      title: "Investor Discussions",
      desc: "Join a vibrant community of investors. Ask questions, share insights, and learn from fellow market enthusiasts.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      color: "bg-indigo-600",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-100",
      route: "/community/discussions",
      stats: { label: "Active Members", value: "12K+" }
    },
    {
      title: "Expert Blogs",
      desc: "Deep-dive articles from industry experts, market analysts, and seasoned investors sharing their proven strategies.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: "bg-rose-600",
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
      borderColor: "border-rose-100",
      route: "/blog",
      stats: { label: "Expert Articles", value: "500+" }
    },
    {
      title: "Market News",
      desc: "Stay ahead with real-time IPO news, market updates, and breaking financial stories that matter.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "bg-amber-600",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
      borderColor: "border-amber-100",
      route: "/news",
      stats: { label: "Daily Updates", value: "50+" }
    },
    {
      title: "Video Learning",
      desc: "Master the markets with our curated video series covering IPO basics to advanced strategies.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-100",
      route: "/videos",
      stats: { label: "Video Lessons", value: "100+" }
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <MainNavbar />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-32">
          <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.4em] px-6 py-2.5 rounded-full mb-8 inline-block shadow-xl shadow-indigo-100 italic">Community Hub</span>
          <h1 className="text-6xl lg:text-[100px] font-black text-slate-950 tracking-tighter leading-[0.85] mb-8">
            Connect. <span className="text-indigo-600 underline decoration-indigo-200">Learn.</span> Grow.
          </h1>
          <p className="text-slate-500 font-medium text-xl lg:text-2xl leading-relaxed">
            Join thousands of investors sharing insights, discussing opportunities, and building wealth together.
          </p>
        </div>

        {/* STATS BAR */}
        <div className="bg-white rounded-[48px] p-8 lg:p-12 mb-16 lg:mb-24 shadow-sm border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-black text-slate-950 tracking-tighter">25K+</div>
              <div className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Active Users</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-black text-indigo-600 tracking-tighter">500+</div>
              <div className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Expert Articles</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-black text-slate-950 tracking-tighter">10K+</div>
              <div className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Discussions</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-black text-emerald-600 tracking-tighter">98%</div>
              <div className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {communityFeatures.map((feature, i) => (
            <div
              key={i}
              onClick={() => navigate(feature.route)}
              className="bg-white rounded-[48px] p-10 lg:p-14 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-700 cursor-pointer group relative overflow-hidden"
            >
              {/* HOVER ACCENT */}
              <div className={`absolute top-0 left-0 w-2 h-0 group-hover:h-full transition-all duration-700 ${feature.color}`}></div>

              <div className="flex items-start justify-between mb-8">
                <div className={`w-20 h-20 ${feature.lightColor} ${feature.textColor} rounded-[32px] flex items-center justify-center transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <div className={`${feature.lightColor} ${feature.textColor} px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider`}>
                  {feature.stats.value} {feature.stats.label}
                </div>
              </div>

              <h3 className="text-3xl font-black text-slate-950 tracking-tighter mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                {feature.desc}
              </p>

              <div className="flex items-center gap-3">
                <span className={`font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${feature.textColor}`}>
                  Explore Now
                </span>
                <svg className={`w-5 h-5 ${feature.textColor} transform group-hover:translate-x-2 transition-transform duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-24 lg:mt-32 p-16 lg:p-24 bg-slate-950 rounded-[64px] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-6 relative z-10">
            Ready to Join the <span className="text-indigo-500">Community?</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 relative z-10">
            Start your journey with thousands of investors who trust Bluestock for their IPO insights.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-slate-950 px-16 py-6 rounded-[28px] font-black text-xl transition-all duration-500 shadow-2xl hover:bg-indigo-600 hover:text-white transform active:scale-95 relative z-10"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}

export default Community;
