import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/admin-login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      alert("Admin Login Successful");
      navigate("/admin-panel");
    } catch (err) {
      alert(err.response?.data?.msg || "Admin Login Failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-900">
          Admin Portal
        </h2>
        <form onSubmit={submit}>
          <input
            placeholder="Admin Email"
            className="border p-2 w-full mb-4 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-indigo-900 text-white p-2 w-full rounded hover:bg-black transition">
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
