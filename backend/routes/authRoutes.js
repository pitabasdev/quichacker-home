const express = require('express');
const { loginTeamMember } = require('../controllers/authController');
const router = express.Router();

router.post('/login/team', loginTeamMember);

module.exports = router;