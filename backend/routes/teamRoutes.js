const express = require("express");
const { 
  addTeam, 
  getTeams, 
  getTeam, 
  updateTeam, 
  deleteTeam 
} = require("../controllers/teamController");

const upload = require("../utils/multer");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE
router.post("/teams", auth, upload.single("diagram"), addTeam);

// READ
router.get("/teams", getTeams);
router.get("/teams/:id", getTeam);

// UPDATE
router.put("/teams/:id", auth, upload.single("diagram"), updateTeam);

// DELETE
router.delete("/teams/:id", auth, deleteTeam);

module.exports = router;
