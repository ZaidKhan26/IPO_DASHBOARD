import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Force clear session if we hit the login page
    useState(() => {
        localStorage.clear();
        sessionStorage.clear();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!email || !password) return alert("Please fill all fields");
        setLoading(true);

        try {
            const res = await api.post("/api/auth/login", {
                email,
                password,
            });

            const storage = remember ? localStorage : sessionStorage;
            storage.setItem("token", res.data.token);
            storage.setItem("role", res.data.role);
            storage.setItem("name", res.data.name);

            alert("Login Successful");
            navigate(res.data.role === "admin" ? "/admin-panel" : "/home");
        } catch (err) {
            alert(err.response?.data?.msg || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const res = await api.post("/api/auth/google-login", {
                idToken: await user.getIdToken(),
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("name", res.data.name);

            alert("Google Login Successful");
            navigate("/home");
        } catch (err) {
            console.error(err);
            alert("Google Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-indigo-100 w-full max-w-md border border-gray-50 transform transition duration-500 hover:scale-[1.01]">
                <div className="text-center mb-10">
                    <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
                    <p className="text-gray-400 font-medium mt-2">Log in to manage your portfolio</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="Email workspace"
                            className="w-full bg-gray-50 border-2 border-transparent p-4 pl-12 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all duration-300 font-medium group-hover:bg-gray-100"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <svg className="w-6 h-6 text-gray-400 absolute left-4 top-4 group-focus-within:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>

                    <div className="relative group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-gray-50 border-2 border-transparent p-4 pl-12 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all duration-300 font-medium group-hover:bg-gray-100"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <svg className="w-6 h-6 text-gray-400 absolute left-4 top-4 group-focus-within:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <div className="flex items-center justify-between px-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="w-5 h-5 rounded-lg border-gray-200 text-indigo-600 focus:ring-indigo-500 transition cursor-pointer"
                            />
                            <span className="text-sm text-gray-500 font-semibold group-hover:text-gray-700 transition">Remember me</span>
                        </label>
                        <span
                            onClick={() => navigate("/forgot-password")}
                            className="text-sm font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer transition"
                        >
                            Forgot Password?
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-100 transform transition active:scale-[0.98] disabled:opacity-70"
                    >
                        {loading ? "Authenticating..." : "Sign In Now"}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                    <div className="relative flex justify-center text-sm uppercase"><span className="bg-white px-4 text-gray-400 font-bold tracking-tighter">or continue with</span></div>
                </div>

                <button
                    onClick={googleLogin}
                    className="w-full bg-white border-2 border-gray-100 hover:border-indigo-100 hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-sm active:scale-[0.98]"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6" alt="google" />
                    Google Account
                </button>

                <p className="mt-10 text-center text-gray-500 font-semibold">
                    New to Bluestock?{" "}
                    <span
                        className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-black underline transition px-1"
                        onClick={() => navigate("/signup")}
                    >
                        Create Account
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;