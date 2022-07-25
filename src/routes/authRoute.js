const { Router } = require('express');

const autenticacao = require('../middlewares/autenticacao');
const AuteticationController = require('../controllers/AuteticationController');

const router = Router();
router.post('/usuario/login', autenticacao.local, AuteticationController.login);
router.post(
  '/usuario/refresh',
  autenticacao.refresh,
  AuteticationController.login,
);
router.post(
  '/usuario/logout',
  [autenticacao.refresh, autenticacao.bearer],
  AuteticationController.logout,
);

module.exports = router;
