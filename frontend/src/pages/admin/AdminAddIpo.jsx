import api from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminAddIpo() {
  const [companies, setCompanies] = useState([]);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => alert("Failed to load companies"));
  }, []);

  const submit = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await api.post("/api/ipo", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("IPO Added");
      navigate("/admin-panel");
    } catch (err) {
      alert("Failed to add IPO");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add IPO</h2>

      <select
        className="border p-2 w-full mb-2"
        onChange={(e) => setData({ ...data, companyId: e.target.value })}
      >
        <option value="">Select Company</option>
        {companies.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Price Band"
        className="border p-2 w-full mb-2"
        onChange={(e) => setData({ ...data, priceBand: e.target.value })}
      />

      <input
        placeholder="Status"
        className="border p-2 w-full mb-4"
        onChange={(e) => setData({ ...data, status: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 w-full rounded"
      >
        Save
      </button>
    </div>
  );
}

export default AdminAddIpo;
