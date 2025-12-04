import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AddTeam from "./AddTeam";
import ViewTeams from "./ViewTeams";
import AbstractDetails from "./AbstractDetails";
import "./App.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isLoginRoute = location.pathname === "/login";

  return (
    <div className="app-root">
      {/* SHOW NAVBAR ONLY AFTER LOGIN */}
      {token && !isLoginRoute && <Navbar />}

      <div className="app-page">
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-team"
            element={
              <ProtectedRoute>
                <AddTeam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <ViewTeams />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teams/:id"
            element={
              <ProtectedRoute>
                <AbstractDetails />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
