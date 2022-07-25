const autenticacao = require('./autenticacao');

module.exports = (req, res, next) => {
  req.authenticated = false;

  if (req.get('Authorization')) {
    return autenticacao.bearer(req, res, next);
  }

  next();
};
