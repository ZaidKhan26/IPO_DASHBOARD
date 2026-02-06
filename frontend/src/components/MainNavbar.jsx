import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MainNavbar({
  showHome = true,
  showAdmin = true,
  showLogout = true,
  showAuthButtons = true,
  mode = "full"
}) {
  const navigate = useNavigate();
  const [showMedia, setShowMedia] = useState(false);
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  const isAdminUser = role === "admin";

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/home")}
        >
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-100">
            <img src="/Scroll Media/7RFqZYlp_400x400 (1).png" className="h-6 w-6 invert brightness-0" alt="logo" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-gray-950 uppercase">Bluestock</span>
        </div>

        {/* LINKS */}
        <div className="hidden lg:flex items-center gap-10 font-black text-[12px] uppercase tracking-widest text-gray-400">
          {showHome && (
            <span onClick={() => navigate("/home")} className="cursor-pointer hover:text-indigo-600 transition-colors">Home</span>
          )}

          {mode === "full" && (
            <>
              <span onClick={() => navigate("/products")} className="cursor-pointer hover:text-indigo-600 transition-colors">Products</span>
              <span onClick={() => navigate("/pricing")} className="cursor-pointer hover:text-indigo-600 transition-colors">Pricing</span>
              <span onClick={() => navigate("/community")} className="cursor-pointer hover:text-indigo-600 transition-colors">Community</span>

              <div className="relative group/menu">
                <span
                  onClick={() => setShowMedia(!showMedia)}
                  className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors py-2"
                >
                  Media
                  <svg className={`w-3 h-3 transition-transform duration-300 ${showMedia ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </span>

                {(showMedia || true) && (
                  <div className="absolute top-full left-0 bg-white shadow-2xl rounded-3xl w-48 p-4 mt-2 border border-gray-50 opacity-0 group-hover/menu:opacity-100 pointer-events-none group-hover/menu:pointer-events-auto transition-all duration-300 origin-top transform scale-95 group-hover/menu:scale-100">
                    <div onClick={() => navigate("/blog")} className="px-5 py-3 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl cursor-pointer transition-colors mb-1">Blog</div>
                    <div onClick={() => navigate("/news")} className="px-5 py-3 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl cursor-pointer transition-colors mb-1">News</div>
                    <div onClick={() => navigate("/videos")} className="px-5 py-3 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl cursor-pointer transition-colors">Videos</div>
                  </div>
                )}
              </div>
            </>
          )}

          <span
            onClick={() => window.open("https://bluestock.in/contact/", "_blank")}
            className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors"
          >
            Support
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10" /></svg>
          </span>

          {showAdmin && isAdminUser && mode === "full" && (
            <span onClick={() => navigate("/admin-panel")} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-100 transition-colors border border-indigo-100">Admin</span>
          )}
        </div>

        {/* AUTH */}
        <div className="flex items-center gap-4">
          {showAuthButtons && !showLogout && (
            <>
              <button onClick={() => navigate("/login")} className="text-[12px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors px-4 py-2">Sign In</button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95"
              >
                Sign Up
              </button>
            </>
          )}

          {showLogout && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Account</span>
                <span className="text-sm font-black text-gray-900 tracking-tight">{localStorage.getItem("name") || "User"}</span>
              </div>
              <button
                onClick={logout}
                className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 border border-red-100 shadow-sm shadow-red-50 active:scale-95"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;
