const autorizacao = require('./autorizacao');

module.exports = (entidade, acao) => (req, res, next) => {
  if (req.authenticated) {
    return autorizacao(entidade, acao)(req, res, next);
  }

  next();
};
