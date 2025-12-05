import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddTeam from "./pages/AddTeam.jsx";
import ViewTeams from "./pages/ViewTeams.jsx";
import AbstractDetails from "./pages/AbstractDetails.jsx";
import EditTeam from "./pages/EditTeam.jsx";

import "./App.css";

/* --------------------------------------------
   PROTECTED ROUTE
--------------------------------------------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  /* --------------------------------------------
     ⏳ LOADING SCREEN (runs only on first visit)
  --------------------------------------------- */
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <LoadingScreen />; // ⟵ SHOW LOADING FIRST
  }

  /* --------------------------------------------
     Hide Navbar & Footer on Login Page
  --------------------------------------------- */
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-root">

      {/* NAVBAR (only when logged in & not on login page) */}
      {token && !isLoginPage && <Navbar />}

      {/* ROUTES */}
      <div className="app-page">
        <Routes>

          {/* BASE PATH → redirects */}
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

          {/* MAIN PAGES */}
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

          <Route
            path="/teams/edit/:id"
            element={
              <ProtectedRoute>
                <EditTeam />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
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

      {/* FOOTER (only when logged in) */}
      {token && !isLoginPage && <Footer />}
    </div>
  );
}
