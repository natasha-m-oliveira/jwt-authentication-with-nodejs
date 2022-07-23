module.exports = (cargosObrigatorios) => (req, res, next) => {
  req.user.cargo = 'assinante';
  if (cargosObrigatorios.indexOf(req.user.cargo) === -1) {
    res.status(401).json({
      message: 'Você não possui permissão para realizar está operação.',
    });
  }
  next();
};
