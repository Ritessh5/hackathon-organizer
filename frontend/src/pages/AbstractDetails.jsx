import { useEffect, useState } from "react";
import { getTeam } from "../api";
import { useParams } from "react-router-dom";

export default function AbstractDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    getTeam(id).then(setTeam);
  }, [id]);

  if (!team) return <p>Loading...</p>;

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h2 className="page-title">{team.team_name}</h2>

      <div className="card shadow p-4">
        <p><strong>Leader:</strong> {team.leader_name}</p>
        <p><strong>State:</strong> {team.state}</p>
        <p><strong>Institution:</strong> {team.institution}</p>

        <hr />

        <h5>Problem Statement</h5>
        <p>{team.problem_statement}</p>

        <h5>Problem Identified</h5>
        <p>{team.problem_identified}</p>

        <h5>Solution Description</h5>
        <p>{team.solution_description}</p>

        <h5>Technology Stack</h5>
        <p>{team.tech_stack}</p>

        {team.diagram_url && (
          <>
            <h5 className="mt-3">Diagram</h5>
            <img
              src={team.diagram_url}
              alt="Diagram"
              className="img-fluid mt-2"
              style={{ borderRadius: "8px", maxHeight: "350px" }}
            />
          </>
        )}
      </div>
    </div>
  );
}
