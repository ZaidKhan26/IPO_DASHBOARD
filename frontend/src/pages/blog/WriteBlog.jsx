import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WriteBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return alert("Login to write blogs");

      await api.post(
        "/api/blogs",
        { title, content, author: localStorage.getItem("name") || "Expert" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Blog Published!");
      navigate("/blog");
    } catch (err) {
      alert("Failed to publish blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900 italic">Bluestock Expert Corner ✍</h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-50">
        <input
          placeholder="Catchy Blog Title..."
          className="text-2xl font-bold w-full border-b-2 border-gray-100 py-4 mb-8 focus:border-indigo-500 outline-none transition"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Share your expert analysis with the community..."
          className="w-full text-lg border-none min-h-[400px] focus:ring-0 outline-none resize-none"
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end mt-8">
          <button
            onClick={submit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl font-bold transform transition hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100"
          >
            Publish Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default WriteBlog;
