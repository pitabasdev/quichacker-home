// routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');


// Register a new team
router.post('/register-team', teamController.registerTeam);

// Get active problem statements
router.post('/problems', teamController.createProblem);
router.get('/problems', teamController.getActiveProblems);

module.exports = router;