const { Router } = require('express');

const autenticacao = require('../middlewares/autenticacao');
const autorizacao = require('../middlewares/autorizacao');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();
router.get(
  '/usuario',
  [autenticacao.bearer, autorizacao('usuario', 'ler')],
  UsuarioController.getAllUsuarios
);
router.get(
  '/usuario/verifica-email/:token',
  autenticacao.verificacaoEmail,
  UsuarioController.validateEmail
);
router.post('/usuario', UsuarioController.createUsuario);
router.post('/usuario/esqueci-minha-senha', UsuarioController.forgotPassword);
router.put(
  '/usuario/redefinir-senha/:token',
  autenticacao.redefinicaoSenha,
  UsuarioController.resetPassword
);
router.put('/usuario/:id', UsuarioController.updateUsuario);
router.delete(
  '/usuario/:id',
  [autenticacao.bearer, autenticacao.local, autorizacao('usuario', 'remover')],
  UsuarioController.deleteUsuario
);

module.exports = router;
