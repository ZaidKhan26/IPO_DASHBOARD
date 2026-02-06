import api from "../../api/axios";
import { useEffect, useState } from "react";
import MainNavbar from "../../components/MainNavbar";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/media/videos")
      .then((res) => {
        setVideos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#0F172A] min-h-screen text-white">
      <MainNavbar />
      <div className="max-w-7xl mx-auto p-6 lg:p-16">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-10">
          <div className="text-center md:text-left">
            <span className="bg-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full mb-6 inline-block border border-indigo-500/30">Educational Series</span>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.8] mb-8">
              Learn <span className="text-indigo-500 italic underline decoration-wavy decoration-indigo-700/50">Market</span>.
              <br />
              With Videos.
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
              Master the art of investing with our curated high-definition video series led by industry veterans.
            </p>
          </div>
          <div className="hidden lg:block relative group">
            <div className="absolute inset-0 bg-indigo-600 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-slate-800 p-1 rounded-[48px] border border-slate-700 shadow-2xl overflow-hidden transform group-hover:rotate-2 transition-transform duration-700">
              <div className="w-80 h-80 flex items-center justify-center">
                <svg className="w-32 h-32 text-indigo-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => <div key={i} className="bg-slate-800/50 h-[350px] rounded-[48px] animate-pulse border border-slate-700/50"></div>)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
            {videos.map((v) => (
              <div key={v._id} className="bg-slate-800/30 rounded-[48px] border border-slate-700/50 overflow-hidden hover:shadow-2xl hover:bg-slate-800/60 transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtubeId}`}
                    title={v.title}
                    className="absolute inset-0 w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent group-hover:border-indigo-600/10 transition-all"></div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <span className="text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-4">Lesson Module</span>
                  <h3 className="font-black text-2xl text-slate-100 line-clamp-2 group-hover:text-white transition-colors leading-tight mb-8">
                    {v.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-700/50 pt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      <span className="text-sm font-black text-slate-300 tracking-tight">Bluestock EDU</span>
                    </div>
                    <span className="text-indigo-500 font-bold text-xs uppercase cursor-pointer hover:underline tracking-tighter">Watch Now &rarr;</span>
                  </div>
                </div>
              </div>
            ))}

            {!videos.length && !loading && (
              <div className="col-span-full py-40 text-center bg-slate-800/20 rounded-[64px] border-4 border-dashed border-slate-700/50 flex flex-col items-center">
                <div className="w-24 h-24 bg-slate-700/50 rounded-[32px] flex items-center justify-center mb-8">
                  <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-4">Cinema is empty...</h3>
                <p className="text-slate-500 font-bold text-lg max-w-sm">Our educational content is currently under post-production. Stay tuned!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Videos;
