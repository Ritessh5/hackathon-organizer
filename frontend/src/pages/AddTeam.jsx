import { useState } from "react";
import { addTeam } from "../api";

export default function AddTeam() {
  const [form, setForm] = useState({});
  const [diagram, setDiagram] = useState(null);
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (diagram) fd.append("diagram", diagram);

    try {
      await addTeam(fd, token);
      setMsg("Team added successfully!");
    } catch (err) {
      setMsg("Error adding team");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <h2 className="page-title">Add Team</h2>
      {msg && <div className="alert alert-info">{msg}</div>}

      <div className="card shadow p-4">
        <form onSubmit={submit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                name="team_name"
                className="form-control"
                placeholder="Team Name"
                onChange={change}
              />
            </div>

            <div className="col-md-6">
              <input
                name="leader_name"
                className="form-control"
                placeholder="Leader Name"
                onChange={change}
              />
            </div>

            <div className="col-md-6">
              <input
                name="state"
                className="form-control"
                placeholder="State"
                onChange={change}
              />
            </div>

            <div className="col-md-6">
              <input
                name="institution"
                className="form-control"
                placeholder="Institution"
                onChange={change}
              />
            </div>

            <div className="col-12">
              <textarea
                name="problem_statement"
                className="form-control"
                placeholder="Problem Statement"
                rows="2"
                onChange={change}
              />
            </div>

            <div className="col-12">
              <textarea
                name="problem_identified"
                className="form-control"
                placeholder="Problem Identified"
                rows="2"
                onChange={change}
              />
            </div>

            <div className="col-12">
              <textarea
                name="solution_description"
                className="form-control"
                placeholder="Solution Description"
                rows="3"
                onChange={change}
              />
            </div>

            <div className="col-12">
              <input
                name="tech_stack"
                className="form-control"
                placeholder="Tech Stack"
                onChange={change}
              />
            </div>

            <div className="col-12">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setDiagram(e.target.files[0])}
              />
            </div>

            <div className="col-12">
              <button className="btn btn-primary w-100">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
