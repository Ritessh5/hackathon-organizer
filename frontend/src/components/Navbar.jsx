import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Active link helper
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="agri-navbar">
      <div className="agri-nav-inner">
        <div className="agri-nav-left" onClick={() => navigate("/dashboard")}>
          <span className="agri-logo-icon">🚜</span>
          <div className="agri-logo-text">
            <span className="agri-logo-title">Agri-Tech Admin</span>
            <span className="agri-logo-subtitle">Hackathon 2026 • Control Panel</span>
          </div>
        </div>

        <ul className="agri-nav-links">
          <li className={isActive("/dashboard") ? "active" : ""}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={isActive("/add-team") ? "active" : ""}>
            <Link to="/add-team">Add Team</Link>
          </li>
          <li className={isActive("/teams") ? "active" : ""}>
            <Link to="/teams">View Teams</Link>
          </li>
        </ul>

        {token && (
          <button className="agri-btn-outline" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
