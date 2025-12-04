const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  team_name: { type: String, required: true },
  leader_name: { type: String, required: true },
  state: { type: String },
  institution: { type: String },
  problem_statement: { type: String },
  problem_identified: { type: String },
  solution_description: { type: String },
  tech_stack: { type: String },
  diagram_url: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Team", TeamSchema);
