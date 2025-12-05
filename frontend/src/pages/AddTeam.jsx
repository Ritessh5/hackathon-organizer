import { useState } from "react";
import { addTeam } from "../api";

export default function AddTeam() {
  const [form, setForm] = useState({});
  const [diagram, setDiagram] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (diagram) fd.append("diagram", diagram);

    try {
      await addTeam(fd, token);
      setMsg("Team added successfully ✨");
      setForm({});
      setDiagram(null);
      if (e.target && typeof e.target.reset === "function") {
        e.target.reset();
      }

    } catch {
      setMsg("Error adding team. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell center-page">
      <div className="page-header">
        <h2>Add Team Manually</h2>
        <p>Use this to create or correct team entries outside the Unstop export.</p>
      </div>

      {msg && <div className="alert alert-info">{msg}</div>}

      <div className="glass-card form-card centered-form">
        <form onSubmit={submit} className="agri-form-grid">
          <div className="form-group">
            <label>Team Name</label>
            <input
              name="team_name"
              className="agri-input"
              onChange={change}
              placeholder="Eg. FarmBot Innovators"
              required
            />
          </div>

          <div className="form-group">
            <label>Team Leader</label>
            <input
              name="leader_name"
              className="agri-input"
              onChange={change}
              placeholder="Leader full name"
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              name="state"
              className="agri-input"
              onChange={change}
              placeholder="Eg. Maharashtra"
            />
          </div>

          <div className="form-group">
            <label>Institution</label>
            <input
              name="institution"
              className="agri-input"
              onChange={change}
              placeholder="College / University"
            />
          </div>

          <div className="form-group full-width">
            <label>Problem Statement</label>
            <textarea
              name="problem_statement"
              className="agri-textarea"
              rows={2}
              onChange={change}
            />
          </div>

          <div className="form-group full-width">
            <label>Problem Identified (Current Pain)</label>
            <textarea
              name="problem_identified"
              className="agri-textarea"
              rows={2}
              onChange={change}
            />
          </div>

          <div className="form-group full-width">
            <label>Solution Description</label>
            <textarea
              name="solution_description"
              className="agri-textarea"
              rows={3}
              onChange={change}
            />
          </div>

          <div className="form-group">
            <label>Technology Stack</label>
            <input
              name="tech_stack"
              className="agri-input"
              onChange={change}
              placeholder="Eg. ML, IoT, Drones, Edge AI"
            />
          </div>

          <div className="form-group">
            <label>Architecture / Diagram (optional)</label>
            <input
              type="file"
              className="agri-input file-input"
              onChange={(e) => setDiagram(e.target.files?.[0] || null)}
            />
          </div>

          <div className="form-group full-width">
            <button
              className="agri-btn-primary w-100"
              disabled={loading}
              type="submit"
            >
              {loading ? "Saving..." : "Save Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
