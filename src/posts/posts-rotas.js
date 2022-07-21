const { middlewaresAutenticacao } = require("../usuarios");
const postsControlador = require("./posts-controlador");

module.exports = (app) => {
  app
    .route("/post")
    .get(postsControlador.lista)
    .post(middlewaresAutenticacao.bearer, postsControlador.adiciona);
};
