import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import MainNavbar from "../../components/MainNavbar";
import Pagination from "../../components/Pagination";

function Discussions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/community/questions?page=${page}&limit=10`)
      .then((res) => {
        setQuestions(res.data?.data || []);
        setTotalPages(res.data?.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page]);

  const upvote = async (id) => {
    try {
      if (!token) return alert("Please login to upvote");
      const res = await api.put(
        `/api/community/questions/${id}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestions(questions.map((q) => (q._id === id ? { ...q, votes: res.data.votes } : q)));
    } catch (err) {
      alert("Failed to upvote");
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <MainNavbar />
      <div className="max-w-6xl mx-auto p-6 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">Community Hall</h1>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">Share insights and ask anything (Page {page} of {totalPages})</p>
          </div>
          <button
            onClick={() => navigate("/community/ask")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-5 rounded-[24px] font-black transition-all duration-300 shadow-xl shadow-indigo-100 transform active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Ask a Question
          </button>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => <div key={i} className="bg-white h-48 rounded-[32px] animate-pulse border border-gray-50"></div>)}
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {questions.map((q) => (
                <div
                  key={q._id}
                  className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 flex flex-col md:flex-row gap-8 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 group"
                >
                  {/* Vote Side */}
                  <div className="flex md:flex-col items-center justify-center bg-gray-50 rounded-3xl p-4 md:w-20 md:h-fit gap-4">
                    <button
                      onClick={() => upvote(q._id)}
                      className="text-gray-400 hover:text-indigo-600 transition-colors transform active:scale-125"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-8 8h16l-8-8z" /></svg>
                    </button>
                    <span className="font-black text-gray-950 text-xl tracking-tighter">{q.votes || 0}</span>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 flex flex-col">
                    <h2
                      onClick={() => navigate(`/community/question/${q._id}`)}
                      className="text-2xl font-black text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors leading-tight mb-4"
                    >
                      {q.title}
                    </h2>
                    <p className="text-gray-500 font-medium line-clamp-2 text-lg mb-6 leading-relaxed">
                      {q.description}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-50">
                      <div className="flex gap-2">
                        {q.tags?.slice(0, 3).map((t, i) => (
                          <span key={i} className="bg-indigo-50 text-indigo-600 text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-indigo-100">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="bg-indigo-50 p-2 rounded-xl">
                            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                          </div>
                          <span className="text-sm font-bold tracking-tight">{q.answers || 0} Answers</span>
                        </div>
                        <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-black text-indigo-600 text-xs">
                            {q.author?.[0]?.toUpperCase() || "A"}
                          </div>
                          <p className="text-sm font-bold text-gray-900">{q.author}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {!questions.length && !loading && (
                <div className="py-20 text-center bg-white rounded-[40px] border-4 border-dashed border-gray-50">
                  <p className="text-gray-300 font-black text-2xl tracking-tight">No discussions found on this page.</p>
                </div>
              )}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Discussions;
