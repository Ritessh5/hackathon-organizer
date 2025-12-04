const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
};

export const addTeam = async (formData, token) => {
  const res = await fetch(`${BASE_URL}/teams`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Error adding team");

  return res.json();
};

export const getTeams = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/teams?${query}`);
  if (!res.ok) throw new Error("Failed fetching teams");
  return res.json();
};

export const getTeam = async (id) => {
  const res = await fetch(`${BASE_URL}/teams/${id}`);
  if (!res.ok) throw new Error("Team not found");
  return res.json();
};
