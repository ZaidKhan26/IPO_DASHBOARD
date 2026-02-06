import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import MainNavbar from "../../components/MainNavbar";

function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [answerContent, setAnswerContent] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  const name = localStorage.getItem("name") || sessionStorage.getItem("name");
  const isAdmin = role === "admin";

  const load = async () => {
    try {
      const res = await api.get(`/api/community/questions/${id}`);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to load question details");
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const postAnswer = async () => {
    if (!answerContent.trim()) return;
    if (!token) return alert("Please login to post an answer");

    try {
      await api.post(
        "/api/community/answers",
        {
          questionId: id,
          text: answerContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswerContent("");
      load();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to post answer");
    }
  };

  const deleteQuestion = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this question?")) return;

      await api.delete(`/api/community/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Question Deleted Successfully");
      navigate("/community/discussions");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete question");
    }
  };

  const upvote = async () => {
    try {
      if (!token) return alert("Please login to upvote");
      const res = await api.put(
        `/api/community/questions/${id}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData({ ...data, q: { ...data.q, votes: res.data.votes } });
    } catch (err) {
      alert("Failed to upvote");
    }
  };

  if (loading) return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <MainNavbar />
      <div className="max-w-5xl mx-auto p-10 animate-pulse">
        <div className="h-64 bg-white rounded-[40px] border border-gray-50 mb-10"></div>
        <div className="h-96 bg-white rounded-[40px] border border-gray-50"></div>
      </div>
    </div>
  );

  if (!data || !data.q) return <div className="p-20 text-center font-black text-gray-400">QUESTION NOT FOUND</div>;

  const { q, answers } = data;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <MainNavbar />
      <div className="max-w-5xl mx-auto p-6 lg:p-12">
        {/* QUESTION CARD */}
        <div className="bg-white rounded-[48px] p-10 lg:p-16 shadow-sm border border-gray-50 mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-100">
                  {q.author?.[0]?.toUpperCase() || "A"}
                </div>
                <div>
                  <p className="text-gray-950 font-black tracking-tight">{q.author}</p>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{new Date(q.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={upvote}
                  className="bg-indigo-50 text-indigo-600 px-6 py-3 rounded-2xl font-black text-sm hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-indigo-100 flex items-center gap-2 group/btn active:scale-95"
                >
                  <svg className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-8 8h16l-8-8z" /></svg>
                  {q.votes || 0}
                </button>
                {isAdmin && (
                  <button
                    onClick={deleteQuestion}
                    className="bg-red-50 text-red-600 p-3 rounded-2xl hover:bg-red-600 hover:text-white transition-all border border-red-100 active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl font-black text-gray-950 tracking-tighter leading-tight mb-8">
              {q.title}
            </h1>

            <p className="text-gray-500 font-medium text-xl leading-relaxed mb-10 whitespace-pre-wrap">
              {q.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-10 border-t border-gray-50">
              {q.tags?.map((t, i) => (
                <span key={i} className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-gray-100">#{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ANSWERS SECTION */}
        <div className="space-y-10">
          <div className="flex items-center justify-between px-6">
            <h2 className="text-2xl font-black text-gray-950 tracking-tighter flex items-center gap-3">
              <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
              Knowledge Pool <span className="text-gray-300 text-lg font-bold ml-2">{answers?.length || 0}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {answers?.map((a) => (
              <div key={a._id} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50 hover:shadow-xl transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center font-black text-gray-400 text-sm">
                      {a.author?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="font-black text-gray-950 tracking-tight">{a.author}</span>
                  </div>
                  <span className="text-[10px] font-black text-gray-300 uppercase italic tracking-tighter">{new Date(a.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 font-medium text-lg leading-relaxed whitespace-pre-wrap pl-2 border-l-4 border-indigo-50/50">
                  {a.text}
                </p>
              </div>
            ))}

            {(!answers || answers.length === 0) && (
              <div className="py-20 text-center bg-white rounded-[40px] border-4 border-dashed border-gray-50">
                <p className="text-gray-300 font-black text-xl tracking-tight uppercase">No answers yet. Share your expertise!</p>
              </div>
            )}
          </div>

          {/* POST ANSWER */}
          <div className="bg-indigo-600 rounded-[48px] p-10 lg:p-16 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden mt-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -ml-20 -mt-20"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black tracking-tighter mb-2">Contribute Insight</h3>
              <p className="text-indigo-100 font-medium mb-10 opacity-80">Help the community grow by sharing your professional analysis.</p>

              <textarea
                className="w-full bg-indigo-500/30 border-2 border-indigo-400/30 rounded-[32px] p-8 text-white placeholder:text-indigo-200/50 outline-none focus:border-white/50 transition-all font-medium text-lg min-h-[200px] mb-8"
                placeholder="Elaborate on your perspective..."
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
              />

              <div className="flex justify-end">
                <button
                  onClick={postAnswer}
                  className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  Broadcast Answer
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
