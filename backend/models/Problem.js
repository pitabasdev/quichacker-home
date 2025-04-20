// models/Problem.js
const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Problem', problemSchema);