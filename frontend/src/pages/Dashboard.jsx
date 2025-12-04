import { useEffect, useState } from "react";
import { getTeams } from "../api";

export default function Dashboard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams()
      .then(setTeams)
      .catch(() => {});
  }, []);

  const states = new Set(teams.map((t) => t.state).filter(Boolean));

  return (
    <div className="page-shell">
      <div className="page-header">
        <h2>Overview</h2>
        <p>Quick snapshot of registrations for Agri-Tech Hackathon 2026.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-blue">
          <div className="stat-icon">👥</div>
          <div className="stat-label">Total Teams</div>
          <div className="stat-value">{teams.length}</div>
        </div>

        <div className="stat-card stat-green">
          <div className="stat-icon">🌎</div>
          <div className="stat-label">States Represented</div>
          <div className="stat-value">{states.size}</div>
        </div>

        <div className="stat-card stat-purple">
          <div className="stat-icon">🧠</div>
          <div className="stat-label">Problem Statements</div>
          <div className="stat-value">{teams.filter(t => t.problem_statement).length}</div>
        </div>
      </div>

      <div className="page-section">
        <h3 className="section-title">What this panel does</h3>
        <p className="section-text">
          Use this admin panel to quickly <strong>search, filter and view</strong> all teams
          who submitted abstracts via Unstop for the Agri-Tech Hackathon 2026. You can
          manage teams by state, institution, domain and technology stack and access
          their full abstract details in seconds during shortlisting or jury rounds.
        </p>
      </div>
    </div>
  );
}
