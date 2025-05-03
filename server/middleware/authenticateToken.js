const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['Authorization'] || req.headers['authorization']; // Handle case sensitivity
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token after "Bearer"

  console.log('Token received:', token);

  if (!token) return res.status(401).json({ message: 'Access token is missing or invalid' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    console.log('Token verified, user:', user);
    req.userId = user.id; // Attach the userId to the request object
    next();
  });
};

module.exports = authenticateToken;