import { useEffect, useState } from "react";
import { getTeams } from "../api";

export default function Dashboard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then(setTeams);
  }, []);

  const states = new Set(teams.map((t) => t.state));

  return (
    <div className="container py-4">
      <h2 className="page-title">Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-white" style={{ background: "#2563eb" }}>
            <div className="card-body">
              <h5>Total Teams</h5>
              <h2>{teams.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white" style={{ background: "#16a34a" }}>
            <div className="card-body">
              <h5>States Represented</h5>
              <h2>{states.size}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
