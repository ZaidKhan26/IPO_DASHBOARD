import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/auth/signup", { name, email, password });
            alert("Registration Successful!");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.msg || "Signup Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] p-6 lg:p-12 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[140px] opacity-40 -ml-20 -mt-20"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[140px] opacity-40 -mr-20 -mb-20"></div>

            <div className="bg-white p-12 lg:p-16 rounded-[64px] shadow-2xl shadow-indigo-100 w-full max-w-xl border border-white relative z-10 flex flex-col lg:flex-row gap-16">

                {/* Left Side Info */}
                <div className="hidden lg:flex flex-col justify-center max-w-[240px]">
                    <div className="bg-indigo-600 w-16 h-16 rounded-[24px] flex items-center justify-center mb-8 shadow-xl shadow-indigo-200">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight mb-6">Start your <span className="text-indigo-600">journey.</span></h2>
                    <p className="text-slate-400 font-bold text-sm leading-relaxed mb-10">Join thousands of smart investors tracking the primary market daily.</p>
                    <ul className="space-y-4">
                        {['Real-time IPO Data', 'Expert Analysis', 'Community Hub'].map(f => (
                            <li key={f} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <div className="w-4 h-4 bg-indigo-50 rounded-full flex items-center justify-center">
                                    <svg className="w-2 h-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                </div>
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side Form */}
                <div className="flex-1">
                    <div className="mb-12">
                        <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-1">Create Account</h3>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Enterprise Access</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Identity</p>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-slate-50 border-2 border-transparent p-5 rounded-[24px] focus:bg-white focus:border-indigo-600 outline-none transition-all duration-300 font-bold text-slate-900"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Corporate Email</p>
                            <input
                                type="email"
                                placeholder="john@bluestock.in"
                                className="w-full bg-slate-50 border-2 border-transparent p-5 rounded-[24px] focus:bg-white focus:border-indigo-600 outline-none transition-all duration-300 font-bold text-slate-900"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Secure Password</p>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border-2 border-transparent p-5 rounded-[24px] focus:bg-white focus:border-indigo-600 outline-none transition-all duration-300 font-bold text-slate-900"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-slate-900 text-white font-black py-6 rounded-[28px] shadow-2xl shadow-indigo-100 transition-all duration-500 transform active:scale-95"
                        >
                            Initialize Account
                        </button>
                    </form>

                    <p className="mt-12 text-center text-slate-400 font-bold text-sm">
                        Already registered?{" "}
                        <span
                            className="text-indigo-600 hover:text-slate-900 cursor-pointer font-black underline decoration-2 transition px-1"
                            onClick={() => navigate("/login")}
                        >
                            Sign In Here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
