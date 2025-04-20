const Team = require("../models/Team");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const team = await Team.findOne({
      $or: [
        { "leader.email": email },
        { "members.email": email }
      ]
    });

    if (!team) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    let user = null;
    let role = "";

    if (team.leader.email === email) {
      user = team.leader;
      role = "leader";
    } else {
      user = team.members.find(member => member.email === email);
      role = "member";
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, name: user.name, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        email: user.email,
        name: user.name,
        role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

module.exports = { loginUser };
