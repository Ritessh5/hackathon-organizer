import { useEffect, useState } from "react";
import { getTeams } from "./api";
import { useNavigate } from "react-router-dom";

export default function ViewTeams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
                    className="agri-btn-outline small"
                    onClick={() => navigate(`/teams/${t.id}`)}
                  >
                    View
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
