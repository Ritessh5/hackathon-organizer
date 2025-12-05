const prisma = require("../prismaClient");
const cloudinary = require("../utils/cloudinary");

// CREATE TEAM
const addTeam = async (req, res) => {
  try {
    let diagramUrl = null;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: "hackathon-diagrams"
      });
      diagramUrl = uploadRes.secure_url;
    }

    const team = await prisma.team.create({
      data: {
        team_name: req.body.team_name,
        leader_name: req.body.leader_name,
        state: req.body.state || null,
        institution: req.body.institution || null,
        problem_statement: req.body.problem_statement || null,
        problem_identified: req.body.problem_identified || null,
        solution_description: req.body.solution_description || null,
        tech_stack: req.body.tech_stack || null,
        diagram_url: diagramUrl
      }
    });

    res.status(201).json(team);
  } catch (err) {
    console.error("Error adding team:", err);
    res.status(500).json({ message: "Error adding team" });
  }
};

// GET ALL TEAMS
const getTeams = async (req, res) => {
  try {
    const { q, state, tech } = req.query;

    const where = {};

    if (q) {
      where.OR = [
        { team_name: { contains: q, mode: "insensitive" } },
        { leader_name: { contains: q, mode: "insensitive" } },
        { problem_statement: { contains: q, mode: "insensitive" } },
        { tech_stack: { contains: q, mode: "insensitive" } },
        { institution: { contains: q, mode: "insensitive" } }
      ];
    }

    if (state) where.state = { contains: state, mode: "insensitive" };
    if (tech) where.tech_stack = { contains: tech, mode: "insensitive" };

    const teams = await prisma.team.findMany({
      where,
      orderBy: { created_at: "desc" }
    });

    res.json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ message: "Error fetching teams" });
  }
};

// GET SINGLE TEAM
const getTeam = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const team = await prisma.team.findUnique({ where: { id } });

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json(team);
  } catch (err) {
    console.error("Error fetching team:", err);
    res.status(500).json({ message: "Error fetching team" });
  }
};

// UPDATE TEAM
const updateTeam = async (req, res) => {
  try {
    const id = Number(req.params.id);

    let diagramUrl = undefined;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: "hackathon-diagrams"
      });
      diagramUrl = uploadRes.secure_url;
    }

    const updated = await prisma.team.update({
      where: { id },
      data: {
        ...req.body,
        diagram_url: diagramUrl ?? undefined,
      }
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating team:", err);
    res.status(500).json({ message: "Error updating team" });
  }
};

// DELETE TEAM
const deleteTeam = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.team.delete({ where: { id } });

    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    console.error("Error deleting team:", err);
    res.status(500).json({ message: "Error deleting team" });
  }
};

module.exports = { addTeam, getTeams, getTeam, updateTeam, deleteTeam };
