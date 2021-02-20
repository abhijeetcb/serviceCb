const jwt = require('jsonwebtoken');
const fs = require('fs');
const { HTTP } = require('../../config');
const logger = require('../../config/logger');

// Checking User LoggedIn
const authentication = async (req, res, next) => {
  const token = req.header('AuthToken');
  if (!token) {
    return res.status(HTTP.CODES.unauthenticated).json({ errorType: HTTP.ERROR_TYPE.authentication_error });
  }
  try {
    const publicKey = fs.readFileSync('./public.key', 'utf8');

    const decodedToken = jwt.verify(token, publicKey, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY, algorithm: ['RS256'],
    });
    Object.assign(req.body, decodedToken);
    res.setHeader('Cache-Control', 'no-store');
    next();
  } catch (err) {
    logger.error(err.stack);
    return res.status(HTTP.CODES.unauthenticated).json({ errorType: HTTP.ERROR_TYPE.authentication_error, message: err });
  }
};

module.exports = authentication;
