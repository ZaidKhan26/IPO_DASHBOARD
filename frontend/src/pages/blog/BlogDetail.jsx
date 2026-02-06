import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import MainNavbar from "../../components/MainNavbar";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api
      .get(`/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch(() => alert("Failed to load blog"));
  }, [id]);

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <MainNavbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10">
        <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b pb-4">
          <span>By <b>{blog.author || "Bluestock Author"}</b></span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {blog.image && (
          <img src={blog.image} className="w-full rounded-xl mb-8" alt="blog cover" />
        )}

        <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
