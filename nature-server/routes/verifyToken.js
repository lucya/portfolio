const { verify } = require('../modules/jwt');

module.exports = function (req, res, next) {
  let token = null;
  if (req.cookies && req.cookies.access_token) {
    token = req.cookies.access_token
  }

  // const token = req.header('access-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('verifyToken error : ', err.message)
    res.status(400).send('Invalid token')
  }
};