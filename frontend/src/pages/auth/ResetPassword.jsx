import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verifying, setVerifying] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await api.get(`/api/auth/verify-reset-token/${token}`);
                setTokenValid(true);
            } catch (err) {
                setError(err.response?.data?.msg || "Invalid or expired reset link");
                setTokenValid(false);
            } finally {
                setVerifying(false);
            }
        };
        if (token) verifyToken();
    }, [token]);

    const resetPassword = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");
        try {
            const res = await api.post(`/api/auth/reset-password/${token}`, { password });
            setMessage(res.data.msg);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError(err.response?.data?.msg || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (verifying) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 font-bold">Verifying reset link...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white p-12 rounded-[40px] shadow-2xl shadow-indigo-100 border border-slate-100 mx-4">
                <div className="mb-10 text-center">
                    <div className={`${tokenValid ? 'bg-green-600' : 'bg-red-600'} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {tokenValid ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
                        {tokenValid ? "Reset Password" : "Link Expired"}
                    </h2>
                    <p className="text-slate-400 font-medium">
                        {tokenValid ? "Create a strong new password" : "This request is no longer valid"}
                    </p>
                </div>

                {message && (
                    <div className="bg-green-50 border border-green-100 text-green-600 p-4 rounded-2xl mb-8 font-bold text-center">
                        {message} Redirecting to login...
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 font-bold text-center">
                        {error}
                    </div>
                )}

                {tokenValid ? (
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">New Password</label>
                            <input
                                type="password"
                                placeholder="Min 6 characters"
                                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold transition-all focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="Must match exactly"
                                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold transition-all focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={loading || message}
                            onClick={resetPassword}
                            className={`w-full bg-slate-900 text-white p-5 rounded-2xl font-black transition-all shadow-xl active:scale-95 ${loading || message ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'}`}
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/forgot-password")}
                        className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black transition-all shadow-xl hover:bg-slate-800 active:scale-95"
                    >
                        Request New Link
                    </button>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;
