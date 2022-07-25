const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const auth = require('./authRoute');
const usuarios = require('./usuariosRoute');
const posts = require('./postsRoute');
const { InvalidArgumentError, NotFound, NotAuthorized } = require('../erros');

module.exports = (app) => {
  app.use(bodyParser.json(), auth, usuarios, posts);
  app.use((err, req, res, next) => {
    let status = 500;
    const body = {
      message: err.message,
    };

    if (err instanceof NotFound) status = 404;
    else if (err instanceof NotAuthorized) status = 403;
    else if (err instanceof InvalidArgumentError) status = 400;
    else if (err instanceof jwt.JsonWebTokenError) status = 401;
    else if (err instanceof jwt.TokenExpiredError) {
      status = 401;
      body.expiredAt = err.expiredAt;
    }
    res.status(status);
    res.json(body);
  });
};
