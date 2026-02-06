import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    api
      .get(`/api/blogs/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => alert("Failed to load blog details"));
  }, [id]);

  const update = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        alert("Login required");
        return;
      }

      await api.put(`/api/blogs/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Blog Updated");
      navigate("/admin/blogs");
    } catch (err) {
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={data.title || ""}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Short Description
          </label>
          <textarea
            value={data.description || ""}
            className="border p-2 w-full rounded h-24 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Content</label>
          <textarea
            value={data.content || ""}
            className="border p-2 w-full rounded h-64 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setData({ ...data, content: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            value={data.author || ""}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setData({ ...data, author: e.target.value })}
          />
        </div>

        <button
          onClick={update}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 w-full rounded-lg font-semibold transition shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditBlog;
