const express = require("express");
const { addTeam, getTeams, getTeam } = require("../controllers/teamController");
const upload = require("../utils/multer");
const auth = require("../middleware/auth");

const router = express.Router();

// Protected: only organizers can add
router.post("/teams", auth, upload.single("diagram"), addTeam);

// Public: list / view
router.get("/teams", getTeams);
router.get("/teams/:id", getTeam);

module.exports = router;
