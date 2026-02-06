import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AskQuestion() {
  const userName =
    localStorage.getItem("name") ||
    sessionStorage.getItem("name") ||
    "Anonymous";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }
      const res = await api.post(
        "/api/community/questions",
        {
          title,
          description: desc,
          author: userName,
          tags: tags.split(",").map((t) => t.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Question Posted");
      navigate("/community/discussions");
    } catch (err) {
      alert("Failed to post question");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Ask a Question</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="e.g. How to check IPO allotment?"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border p-2 rounded h-40"
            placeholder="Explain your question in detail..."
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Tags (Comma separated)</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="e.g. IPO, Allotment, Bluestock"
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          onClick={submit}
          className="bg-indigo-600 text-white px-6 py-2 rounded font-bold"
        >
          Post Question
        </button>
      </div>
    </div>
  );
}

export default AskQuestion;
