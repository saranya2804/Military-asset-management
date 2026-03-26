// models/assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  assetName: String,
  assignedTo: String, // soldier/unit
  quantity: Number,
  base: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);