const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = async function (req, res, next) {
  try {
    // Get token from header
    const token = req.header("x-auth-token");

    // Check if token exists
    if (!token) {
      return res.status(401).json({ msg: "Unauthorised action" });
    };

    const decoded = await jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded
    next()


  } catch (error) {
      res.status(400).json({msg: 'Invalid token'})
  }
};
