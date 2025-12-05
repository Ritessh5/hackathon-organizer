import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddTeam from "./pages/AddTeam.jsx";
import ViewTeams from "./pages/ViewTeams.jsx";
import AbstractDetails from "./pages/AbstractDetails.jsx";
import EditTeam from "./pages/EditTeam.jsx";

import "./App.css";

/* --------------------------------------------
   PROTECTED ROUTE WITH AUTO-LOGOUT
--------------------------------------------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // No token → redirect to login
  if (!token) return <Navigate to="/login" replace />;

  return children;
}

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Hide navbar & footer ONLY on login page
  const isLoginRoute = location.pathname === "/login";

  return (
    <div className="app-root">

      {/* NAVBAR - visible only after login */}
      {token && !isLoginRoute && <Navbar />}

      {/* PAGE CONTENT */}
      <div className="app-page">
        <Routes>
          {/* ROOT → Auto redirect */}
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* LOGIN PAGE */}
          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ADD TEAM */}
          <Route
            path="/add-team"
            element={
              <ProtectedRoute>
                <AddTeam />
              </ProtectedRoute>
            }
          />

          {/* VIEW TEAMS */}
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <ViewTeams />
              </ProtectedRoute>
            }
          />

          {/* ABSTRACT / TEAM DETAILS */}
          <Route
            path="/teams/:id"
            element={
              <ProtectedRoute>
                <AbstractDetails />
              </ProtectedRoute>
            }
          />

          {/* EDIT TEAM */}
          <Route
            path="/teams/edit/:id"
            element={
              <ProtectedRoute>
                <EditTeam />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK ROUTES */}
          <Route
            path="*"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>

      {/* FOOTER - hidden on login */}
      {token && !isLoginRoute && <Footer />}
    </div>
  );
}

export default App;
