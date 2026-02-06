import { useState } from "react";
import api from "../../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendLink = async () => {
    try {
      const res = await api.post("/api/auth/forgot-password", { email });
      alert("Reset link generated. Token: " + res.data.token);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 border p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={sendLink}
          className="bg-black text-white p-2 w-full"
        >
          Send Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
