const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jtwSecretKey');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    const { user } = jwt.verify(token, jwtSecret);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
