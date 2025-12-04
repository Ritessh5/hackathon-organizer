import { useEffect, useState } from "react";
import { getTeams } from "../api";
import { useNavigate } from "react-router-dom";

export default function ViewTeams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loadTeams = () => {
    getTeams({ q: search || undefined }).then(setTeams);
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="page-title">All Teams</h2>

      <form className="input-group mb-4" onSubmit={(e) => { e.preventDefault(); loadTeams(); }}>
        <input
          className="form-control"
          placeholder="Search by team, leader, tech stack..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Leader</th>
            <th>State</th>
            <th>Tech Stack</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {teams.map((t, i) => (
            <tr key={t.id}>
              <td>{i + 1}</td>
              <td>{t.team_name}</td>
              <td>{t.leader_name}</td>
              <td>{t.state}</td>
              <td>{t.tech_stack}</td>
              <td>
                <button
                  onClick={() => navigate(`/teams/${t.id}`)}
                  className="btn btn-sm btn-outline-primary"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
