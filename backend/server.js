const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const prisma = require("./prismaClient");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");

dotenv.config();

const app = express();

// ---------- CORS FIX ----------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hackathon-organizer.vercel.app",
      "https://agritech-admin.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// BODY PARSER
app.use(express.json());

// ---------- TEST DB ----------
(async () => {
  try {
    await prisma.$connect();
    console.log("PostgreSQL (Prisma) connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
})();

// ---------- ROUTES ----------
app.get("/", (req, res) => {
  res.send("Hackathon Organizer API running (PostgreSQL)");
});

app.use("/api/auth", authRoutes);
app.use("/api", teamRoutes);

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
