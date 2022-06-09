const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes, changed from using res to forward info to req
  authMiddleware: function (req, res, next ) {
    // allows token to be sent via req.body, req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    //no token in header so tell user we need a token
    if (!token) {
      return res.status(400).json({ message: 'No Token Provided' });
    }

    // verify token and get user data out of it
    //get the user matching the token, send it along with request body to requests
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      return res.status(400).json({ message: 'Invalid token!' });
    }

    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
