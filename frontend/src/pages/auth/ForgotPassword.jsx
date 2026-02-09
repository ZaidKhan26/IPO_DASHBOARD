import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendLink = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await api.post("/api/auth/forgot-password", { email });
      setMessage(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-12 rounded-[40px] shadow-2xl shadow-indigo-100 border border-slate-100 mx-4">
        <div className="mb-10 text-center">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-100">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Forgot Password?</h2>
          <p className="text-slate-400 font-medium">Enter your email for the recovery link</p>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-100 text-green-600 p-4 rounded-2xl mb-8 font-bold text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 font-bold text-center">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Email Address</label>
            <input
              type="email"
              placeholder="e.g. name@company.com"
              className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold transition-all focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            onClick={sendLink}
            className={`w-full bg-slate-900 text-white p-5 rounded-2xl font-black transition-all shadow-xl active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'}`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full text-slate-400 font-bold py-2 hover:text-slate-900 transition-colors"
          >
            Wait, I remember it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
