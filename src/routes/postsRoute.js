const { Router } = require("express");

const autenticacao = require("../middlewares/autenticacao");
const autorizacao = require("../middlewares/autorizacao");
const PostController = require("../controllers/PostController");

const router = Router();

router.get("/post", PostController.lista);
router.post("/post", autenticacao.bearer, PostController.adiciona);
router.delete(
  "/post/:id",
  [autenticacao.bearer, autorizacao(["admin", "editor"])],
  PostController.remover
);

module.exports = router;
