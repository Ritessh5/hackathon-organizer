const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const teamRoutes = require("./routes/teamRoutes");
const authRoutes = require("./routes/authRoutes");
const prisma = require("./prismaClient");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test DB connection once
async function testDB() {
  try {
    await prisma.$connect();
    console.log("PostgreSQL (Prisma) connected");
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err.message);
    process.exit(1);
  }
}
testDB();

// Basic route
app.get("/", (req, res) => {
  res.send("Hackathon Organizer API running (PostgreSQL)");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", teamRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
