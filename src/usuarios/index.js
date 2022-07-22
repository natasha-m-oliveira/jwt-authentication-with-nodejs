module.exports = {
  rotas: require("../routes/usuariosRoute"),
  controlador: require("./usuarios-controlador"),
  modelo: require("./usuarios-modelo"),
  estrategiasAutenticacao: require("../estrategias-autenticacao"),
  middlewaresAutenticacao: require("../middlewares/autenticacao"),
};
