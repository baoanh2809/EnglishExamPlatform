const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js'); 

const authorization = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded._id).populate('role');

      const priorityRole = new Map([
        ["admin", 2],
        ["teacher", 1],
        ["student", 0]
      ]);
      if (!user) {
        return res.status(401).json({ message: 'Please check your account again or permission is not granted' });
      }

      if (user.role.priority < priorityRole.get(requiredRole)) {
        return res.status(403).json({ message: 'You are not authorized to perform this operation' });
      }

      req.user = user; // Attach user to request object
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unable to authenticate token' });
    }
  };
};

module.exports = authorization;