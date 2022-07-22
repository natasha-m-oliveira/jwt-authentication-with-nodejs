const { Router } = require("express");

const autenticacao = require("../middlewares/autenticacao");
const UsuarioController = require("../controllers/UsuarioController");

const router = Router();
router.get("/usuario", UsuarioController.getAllUsuarios);
router.get(
  "/usuario/verifica-email/:token",
  autenticacao.verificacaoEmail,
  UsuarioController.validateEmail
);
router.post("/usuario", UsuarioController.createUsuario);
router.delete(
  "/usuario/:id",
  autenticacao.bearer,
  UsuarioController.deleteUsuario
);

module.exports = router;
