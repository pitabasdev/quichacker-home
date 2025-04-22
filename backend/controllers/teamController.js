const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const Team = require('../models/Team');
const Problem = require('../models/Problem');
require("dotenv").config()

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const registerTeam = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      const { team, leader, members } = req.body;
  
      // Validate input data
      if (!team || !leader || !members || !Array.isArray(members)) {
        await session.abortTransaction();
        return res.status(400).json({ error: 'Invalid request data' });
      }
  
      // Check if problem exists (skip if problemId is "0")
      if (team.problemId && team.problemId !== "0") {
        const problemExists = await Problem.findById(team.problemId).session(session);
        if (!problemExists) {
          await session.abortTransaction();
          return res.status(400).json({ error: 'Selected problem statement does not exist' });
        }
      }
  
      // Check if any email (leader or members) already exists in the system
      const allEmails = [leader.email, ...members.map(m => m.email)];
      const existingUsers = await Team.find({
        $or: [
          { 'leader.email': { $in: allEmails } },
          { 'members.email': { $in: allEmails } }
        ]
      }).session(session);
  
      if (existingUsers.length > 0) {
        await session.abortTransaction();
        return res.status(400).json({ error: 'One or more emails are already registered' });
      }
  
      // Generate random passwords for all users
      const leaderPassword = uuidv4().split('-')[0];
      const memberPasswords = members.map(() => uuidv4().split('-')[0]);
  
      // Create the team with hashed passwords
      const newTeam = new Team({
        name: team.name,
        description: team.description,
        problem: team.problemId === "0" ? null : team.problemId,
        leader: {
          name: leader.name,
          email: leader.email,
          phone: leader.phone,
          gender: leader.gender,
          password: leaderPassword
        },
        members: members.map((member, index) => ({
          name: member.name,
          email: member.email,
          gender: member.gender,
          password: memberPasswords[index]
        }))
      });
  
      await newTeam.save({ session });
      await session.commitTransaction();
      
      // Prepare credentials for response and email
      const credentials = {
        teamName: team.name,
        leader: {
          name: leader.name,
          email: leader.email,
          password: leaderPassword,
          role: 'leader'
        },
        members: members.map((member, index) => ({
          name: member.name,
          email: member.email,
          password: memberPasswords[index],
          role: 'member'
        }))
      };

      // Send emails with credentials
      await sendRegistrationEmails(credentials);
  
      res.status(201).json({
        message: 'Team registration successful. Credentials have been emailed to all members.',
        credentials
      });
  
    } catch (error) {
      await session.abortTransaction();
      console.error('Team registration error:', error);
      
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Email already exists in the system' });
      }
      
      res.status(500).json({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } finally {
      session.endSession();
    }
};

// Function to send registration emails
async function sendRegistrationEmails(credentials) {
  try {
    // Email to team leader
    await transporter.sendMail({
      from: `"Competition Team" <hr@infotactlearning.in>`,
      to: credentials.leader.email,
      subject: `Your Team ${credentials.teamName} Registration Details`,
      html: `
        <h2>Welcome, ${credentials.leader.name}!</h2>
        <p>Your team <strong>${credentials.teamName}</strong> has been successfully registered.</p>
        <h3>Your Login Credentials:</h3>
        <p><strong>Email:</strong> ${credentials.leader.email}</p>
        <p><strong>Password:</strong> ${credentials.leader.password}</p>
        <p><strong>Role:</strong> Team Leader</p>
        <p>Please keep these credentials secure and don't share them with others.</p>
        <p>You can now log in to the competition portal using these credentials.</p>
      `
    });

    // Emails to team members
    for (const member of credentials.members) {
      await transporter.sendMail({
        from: `"Competition Team" Competition Team" <hr@infotactlearning.in>`,
        to: member.email,
        subject: `Welcome to Team ${credentials.teamName}`,
        html: `
          <h2>Welcome, ${member.name}!</h2>
          <p>You have been added to team <strong>${credentials.teamName}</strong>.</p>
          <h3>Your Login Credentials:</h3>
          <p><strong>Email:</strong> ${member.email}</p>
          <p><strong>Password:</strong> ${member.password}</p>
          <p><strong>Role:</strong> Team Member</p>
          <p>Please keep these credentials secure and don't share them with others.</p>
          <p>You can now log in to the competition portal using these credentials.</p>
          <p>Team Leader: ${credentials.leader.name} (${credentials.leader.email})</p>
        `
      });
    }
  } catch (emailError) {
    console.error('Error sending emails:', emailError);
    // Don't fail the registration if emails fail to send
  }
}

const createProblem = async (req, res) => {
  try {
    const { title, category, slug, description, isActive } = req.body;

    if (!title || !category || !slug || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingProblem = await Problem.findOne({ slug });
    if (existingProblem) {
      return res.status(400).json({ error: 'Problem with this slug already exists' });
    }

    const newProblem = new Problem({
      title,
      category,
      slug,
      description,
      isActive: isActive !== undefined ? isActive : true
    });

    await newProblem.save();

    res.status(201).json({
      message: 'Problem statement created successfully',
      problem: newProblem
    });

  } catch (error) {
    console.error('Error creating problem:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getActiveProblems = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    const activeProblems = await Problem.find({ isActive: true })
      .select('_id title category description')
      .lean();

    res.json(activeProblems || []);

  } catch (error) {
    console.error('Error fetching problem statements:', error);
    res.status(500).json({ 
      error: 'Failed to fetch problem statements',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  registerTeam,
  createProblem,
  getActiveProblems
};