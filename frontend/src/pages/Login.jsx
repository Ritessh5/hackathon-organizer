import { useEffect, useState } from "react";
import { login } from "./api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, redirect away
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setErr("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-overlay" />

      <div className="auth-container">
        <div className="auth-card glass-card">
          <h1 className="auth-title">Organizer Login</h1>
          <p className="auth-subtitle">
            Access the <span>Agri-Tech Hackathon 2026</span> admin panel.
          </p>

          {err && <div className="alert alert-danger auth-error">{err}</div>}

          <form onSubmit={submit} className="auth-form">
            <label className="auth-label">Username</label>
            <input
              className="auth-input"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setU(e.target.value)}
            />

            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setP(e.target.value)}
            />

            <button
              className="agri-btn-primary auth-btn"
              disabled={loading}
              type="submit"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-footer">
            <span className="auth-tag">Somaiya • E-CESA • Agri-Tech 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
