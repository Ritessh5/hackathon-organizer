import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTeam from "./pages/AddTeam";
import ViewTeams from "./pages/ViewTeams";
import AbstractDetails from "./pages/AbstractDetails";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/add-team"
          element={token ? <AddTeam /> : <Navigate to="/login" />}
        />

        <Route path="/teams" element={<ViewTeams />} />
        <Route path="/teams/:id" element={<AbstractDetails />} />
      </Routes>
    </>
  );
}

export default App;
