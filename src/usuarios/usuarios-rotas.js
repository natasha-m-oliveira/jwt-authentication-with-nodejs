const middlewaresAutenticacao = require("./middlewares-autenticacao");
const usuariosControlador = require("./usuarios-controlador");

module.exports = (app) => {
  app
    .route("/usuario/refresh")
    .post(middlewaresAutenticacao.refresh, usuariosControlador.login);

  app
    .route("/usuario/login")
    .post(middlewaresAutenticacao.local, usuariosControlador.login);

  app
    .route("/usuario/logout")
    .post(
      [middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer],
      usuariosControlador.logout
    );

  app
    .route("/usuario")
    .post(usuariosControlador.adiciona)
    .get(usuariosControlador.lista);

  app
    .route("/usuario/verifica-email/:token")
    .get(
      middlewaresAutenticacao.verificacaoEmail,
      usuariosControlador.verificaEmail
    );

  app
    .route("/usuario/:id")
    .delete(middlewaresAutenticacao.bearer, usuariosControlador.deleta);
};
