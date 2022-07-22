const Usuario = require("../models/Usuario");
const Services = require("./Services");
const tokens = require("../tokens");
const { EmailVerificacao } = require("../emails");

class UsuarioServices extends Services {
  constructor() {
    super("usuarios");
  }

  geraEndereco(rota, token) {
    const baseUrl = process.env.BASE_URL;
    return `${baseUrl}${rota}${token}`;
  }

  async createRecord({ nome, email, senha }) {
    const alreadyRegistered = await super.getOneRecord({ email });
    if (alreadyRegistered) {
      throw new InternalServerError("E-mail já cadastrado.");
    }
    const usuario = new Usuario({ nome, email, senha, emailVerificado: false });
    await usuario.valida();
    await super.createRecord(usuario);
    const { id } = await super.getOneRecord({ email });
    usuario.setId(id);

    const token = tokens.verificacaoEmail.cria(usuario.id);
    const endereco = this.geraEndereco("/usuario/verifica-email/", token);
    const emailVerificacao = new EmailVerificacao(usuario, endereco);
    emailVerificacao.enviaEmail().catch(console.log);
  }

  async validateEmail(id) {
    await super.updateRecord({ emailVerificado: true }, id);
  }
}

module.exports = UsuarioServices;
