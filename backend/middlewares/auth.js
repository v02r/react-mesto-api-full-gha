const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/UnauthorizedErr');
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
console.log(req.header("Authorization"));
  const JWT_SECRET = process.env.JWT_SECRET || 'some-secret-key';
  let payload;

  try{
    const token = req.header("Authorization").split(" ")[1];
  payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
    throw new UnauthorizedErr('Необходима авторизация');
  }
  req.user = payload;
  return next();
};

module.exports = auth;
