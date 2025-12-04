import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeams } from "../api";

export default function AbstractDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    getTeam(id)
      .then(setTeam)
      .catch(() => setTeam(null));
  }, [id]);

  if (!team) {
    return (
      <div className="page-shell">
        <p>Loading team details...</p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <h2>{team.team_name}</h2>
        <p>
          {team.institution && <span>{team.institution} • </span>}
          {team.state && <span>{team.state}</span>}
        </p>
      </div>

      <div className="glass-card details-card">
        <div className="details-meta">
          <p><strong>Leader:</strong> {team.leader_name}</p>
          {team.tech_stack && (
            <p>
              <strong>Tech Stack:</strong> {team.tech_stack}
            </p>
          )}
        </div>

        <div className="details-section">
          <h4>Problem Statement</h4>
          <p>{team.problem_statement || "Not provided."}</p>
        </div>

        <div className="details-section">
          <h4>Problem Identified</h4>
          <p>{team.problem_identified || "Not provided."}</p>
        </div>

        <div className="details-section">
          <h4>Solution Description</h4>
          <p>{team.solution_description || "Not provided."}</p>
        </div>

        {team.diagram_url && (
          <div className="details-section">
            <h4>Architecture / Diagram</h4>
            <img
              src={team.diagram_url}
              alt="Architecture diagram"
              className="details-diagram"
            />
          </div>
        )}
      </div>
    </div>
  );
}
