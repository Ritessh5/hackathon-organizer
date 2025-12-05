import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaTractor } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="agri-navbar">
      <div className="nav-container">
        
        {/* Logo */}
        <div className="nav-left">
          <FaTractor className="logo-icon" />
          <span className="logo-text">Agri-Tech Admin</span>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-only">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/add-team">Add Team</Link></li>
          <li><Link to="/teams">View Teams</Link></li>
          <li><button onClick={logout} className="logout-btn">Logout</button></li>
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <ul className="mobile-menu">
          <li><Link onClick={() => setOpen(false)} to="/dashboard">Dashboard</Link></li>
          <li><Link onClick={() => setOpen(false)} to="/add-team">Add Team</Link></li>
          <li><Link onClick={() => setOpen(false)} to="/teams">View Teams</Link></li>
          <li><button onClick={logout} className="logout-btn">Logout</button></li>
        </ul>
      )}
    </nav>
  );
}
