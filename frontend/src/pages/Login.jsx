import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setErr("Invalid username or password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #f1f5f9)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "380px", borderRadius: "16px" }}
      >
        <h3 className="text-center mb-3 fw-bold">Organizer Login</h3>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={submit}>
          <input
            className="form-control mt-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setU(e.target.value)}
            style={{ height: "48px" }}
          />

          <input
            className="form-control mt-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setP(e.target.value)}
            style={{ height: "48px" }}
          />

          <button
            className="btn btn-primary w-100 mt-4"
            style={{ height: "48px", fontSize: "17px" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
