import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import Pagination from "../../components/Pagination";

function AdminManageIpos() {
    const [ipos, setIpos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        api
            .get(`/api/ipo?page=${page}&limit=10`)
            .then((res) => {
                const data = res.data?.data || (Array.isArray(res.data) ? res.data : []);
                setIpos(data);
                setTotalPages(res.data?.totalPages || 1);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Load IPOs error:", err);
                setLoading(false);
            });
    }, [page]);

    const deleteIpo = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this IPO?")) return;

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            await api.delete(`/api/ipo/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setIpos(ipos.filter((i) => i._id !== id));
        } catch (err) {
            alert(err.response?.data?.msg || "Failed to delete IPO");
        }
    };

    return (
        <div className="bg-[#F1F5F9] min-h-screen">
            <AdminNavbar />

            <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 mb-4 inline-block shadow-sm">Inventory Control</span>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Manage All IPOs.</h1>
                        <p className="text-slate-400 font-medium mt-2">View and manage all market listings (Page {page} of {totalPages})</p>
                    </div>
                    <button
                        onClick={() => navigate("/add-ipo")}
                        className="bg-slate-900 text-white px-8 py-5 rounded-2xl font-black transition-all hover:bg-slate-800 shadow-xl active:scale-95 flex items-center gap-3 self-start"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New IPO
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white h-[200px] rounded-[40px] animate-pulse border border-slate-100"></div>
                        ))}
                    </div>
                ) : ipos.length === 0 ? (
                    <div className="bg-white rounded-[48px] p-16 text-center border border-slate-100 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">No IPOs Found</h3>
                        <p className="text-slate-400 font-medium mb-8">Get started by creating your first IPO listing</p>
                        <button onClick={() => navigate("/add-ipo")} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black">Add IPO</button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ipos.map((ipo) => (
                                <div
                                    key={ipo._id}
                                    className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 group relative flex flex-col"
                                >
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center p-2 border border-slate-100">
                                            <img src={ipo.companyId?.logoUrl || "https://placehold.co/100"} alt="logo" className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl text-slate-900 tracking-tight leading-tight mb-1">{ipo.companyId?.name || "Company"}</h3>
                                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{ipo.status}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-auto pt-6 border-t border-slate-50">
                                        <button
                                            onClick={() => navigate(`/edit-ipo/${ipo._id}`)}
                                            className="flex-1 bg-slate-50 text-slate-700 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteIpo(ipo._id)}
                                            className="bg-red-50 text-red-600 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
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

export default AdminManageIpos;
