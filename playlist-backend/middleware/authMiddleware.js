const jwt = require('jsonwebtoken');

const sverifyToken = (req, res, next) => {
  
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }


  const tokenWithoutBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;


  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = decoded;

    next();
  });
};

module.exports = { verifyToken };
