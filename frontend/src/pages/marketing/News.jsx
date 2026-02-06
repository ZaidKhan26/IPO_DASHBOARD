import api from "../../api/axios";
import { useEffect, useState } from "react";
import MainNavbar from "../../components/MainNavbar";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/media/news")
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <MainNavbar />
      <div className="max-w-7xl mx-auto p-6 lg:p-20">
        <div className="text-center mb-24">
          <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mb-6 inline-block">Global Markets</span>
          <h1 className="text-6xl lg:text-9xl font-black text-slate-950 tracking-tighter leading-[0.8]">
            Daily <span className="text-gray-300">Pulse.</span>
          </h1>
          <p className="text-slate-400 text-xl font-bold mt-10 max-w-2xl mx-auto leading-relaxed">Breaking stories from the world of IPOs and emerging companies, delivered with institutional precision.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[1, 2, 4, 4].map(i => <div key={i} className="bg-white h-[300px] rounded-[48px] animate-pulse border border-slate-100"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {news.map((item, i) => (
              <div key={item._id} className="group relative flex flex-col gap-8 transition-transform duration-500 hover:-translate-y-2">
                <div className="flex items-start gap-10">
                  <div className="hidden sm:flex flex-col items-center gap-4 text-slate-300 font-black">
                    <span className="text-5xl tracking-tighter">0{i + 1}</span>
                    <div className="w-px h-24 bg-slate-100 group-hover:bg-indigo-200 transition-colors"></div>
                  </div>
                  <div className="flex-1">
                    <span className="text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-4 inline-block">{item.author || "Bluestock Press"}</span>
                    <h3
                      className="text-3xl font-black text-slate-950 leading-tight mb-6 hover:text-indigo-600 transition-colors cursor-pointer"
                      onClick={() => window.open(item.link, "_blank")}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed line-clamp-3 mb-8">
                      Track the latest movements in {item.title.split(' ')[0]} and understand how it impacts your portfolio strategy.
                    </p>
                    <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full group-hover:scale-150 transition-transform"></div>
                        <span className="text-sm font-black text-slate-400">Published {new Date(item.pubDate).toLocaleDateString()}</span>
                      </div>
                      <button
                        onClick={() => window.open(item.link, "_blank")}
                        className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors underline underline-offset-8"
                      >
                        Read Article
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {!news.length && !loading && (
              <div className="col-span-full py-40 text-center bg-white rounded-[64px] border-4 border-dashed border-slate-100 flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Quiet on the press front.</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
