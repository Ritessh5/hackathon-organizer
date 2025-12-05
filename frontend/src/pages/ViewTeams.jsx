import { useEffect, useState } from "react";
import { getTeams, deleteTeam } from "../api";
import { useNavigate } from "react-router-dom";

export default function ViewTeams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const loadTeams = async (q) => {
    setLoading(true);
    try {
      const data = await getTeams(q ? { q } : {});
      setTeams(data);
    } catch {
      console.error("Failed fetching teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadTeams(search);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      await deleteTeam(id, token);
      loadTeams();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <h2>Teams & Abstracts</h2>
        <p>Search by team name, leader, state, institution or tech stack.</p>
      </div>

      <form className="search-row" onSubmit={handleSearch}>
        <input
          className="agri-input search-input"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="agri-btn-primary search-btn" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="table-wrapper glass-card">
        <table className="agri-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Leader</th>
              <th>State</th>
              <th>Tech Stack</th>
              <th>Actions</th>
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
                <td className="action-buttons">
                  <button
                    className="agri-btn-outline small"
                    onClick={() => navigate(`/teams/${t.id}`)}
                  >
                    View
                  </button>

                  <button
                    className="agri-btn-primary small"
                    onClick={() => navigate(`/teams/edit/${t.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="agri-btn-danger small"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!loading && teams.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-row">
                  No teams found yet. Once abstracts are imported, they’ll appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
