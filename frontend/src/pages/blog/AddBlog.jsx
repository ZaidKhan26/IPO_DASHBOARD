import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await api.post("/api/blogs", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Blog Added");
      navigate("/admin/blogs");
    } catch (err) {
      alert("Failed to add blog");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Blog</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <textarea
        className="border p-2 w-full mb-2 h-40"
        placeholder="Content"
        onChange={(e) => setData({ ...data, content: e.target.value })}
      />
      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save Blog
      </button>
    </div>
  );
}

export default AddBlog;
