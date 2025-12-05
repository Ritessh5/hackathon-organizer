import { useEffect, useState } from "react";
import { getTeam, updateTeam } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTeam() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [diagram, setDiagram] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getTeam(id).then(setForm);
  }, [id]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (diagram) fd.append("diagram", diagram);

    try {
      await updateTeam(id, fd, token);
      setMsg("Updated successfully!");
      setTimeout(() => navigate("/teams"), 800);
    } catch {
      setMsg("Update failed");
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="page-shell">
      <h2>Edit Team</h2>

      {msg && <div className="alert alert-info">{msg}</div>}

      <form className="glass-card form-card" onSubmit={submit}>
        <input name="team_name" value={form.team_name || ""} onChange={change} className="agri-input" />
        <input name="leader_name" value={form.leader_name || ""} onChange={change} className="agri-input" />

        <textarea
          name="problem_statement"
          value={form.problem_statement || ""}
          onChange={change}
          className="agri-textarea"
        />

        <input type="file" onChange={(e) => setDiagram(e.target.files?.[0])} />

        <button className="agri-btn-primary">Save</button>
      </form>
    </div>
  );
}
