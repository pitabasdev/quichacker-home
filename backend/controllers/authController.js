const Team = require('../models/Team');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginTeamMember = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find team that has either leader or member with this email
    const team = await Team.findOne({
      $or: [
        { 'leader.email': email },
        { 'members.email': email }
      ]
    });

    if (!team) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if email belongs to leader
    let user = null;
    let role = 'member';
    
    if (team.leader.email === email) {
      user = team.leader;
      role = 'leader';
    } else {
      // Find the member
      user = team.members.find(member => member.email === email);
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: team._id,
        email: user.email,
        role,
        name: user.name,
        teamId: team._id,
        teamName: team.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email,
        role,
        teamId: team._id,
        teamName: team.name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  loginTeamMember
};