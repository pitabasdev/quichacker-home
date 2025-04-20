const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  password: { type: String, required: true }
});

const teamLeaderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  password: { type: String, required: true }
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true
  },
  leader: { type: teamLeaderSchema, required: true },
  members: [teamMemberSchema],
  createdAt: { type: Date, default: Date.now }
});

// Pre-save hook to hash passwords
teamSchema.pre("save", async function (next) {
  if (!this.leader.password.startsWith("$2b$")) {
    const salt = await bcrypt.genSalt(10);
    this.leader.password = await bcrypt.hash(this.leader.password, salt);
  }

  for (const member of this.members) {
    if (!member.password.startsWith("$2b$")) {
      const salt = await bcrypt.genSalt(10);
      member.password = await bcrypt.hash(member.password, salt);
    }
  }

  next();
});

module.exports = mongoose.model("Team", teamSchema);
