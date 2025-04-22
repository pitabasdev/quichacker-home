const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const isTeamMember = (req, res, next) => {
  if (req.user.role !== 'leader' && req.user.role !== 'member') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

module.exports = {
  authenticate,
  isTeamMember
};