const Usuario = require('../models/Usuario');
const Services = require('./Services');
const tokens = require('../tokens');
const { EmailVerificacao, EmailRedefinicaoSenha } = require('../emails');
const { InternalServerError } = require('../erros');

class UsuarioServices extends Services {
  constructor() {
    super('usuarios');
  }

  geraEndereco(rota, token) {
    const baseUrl = process.env.BASE_URL;
    return `${baseUrl}${rota}${token}`;
  }

  async createRecord({ nome, email, senha, cargo }) {
    const alreadyRegistered = await super.getOneRecord('*', { email });
    if (alreadyRegistered) {
      throw new InternalServerError('E-mail já cadastrado.');
    }
    const usuario = new Usuario({
      nome,
      email,
      senha,
      emailVerificado: false,
      cargo,
    });
    await usuario.valida();
    await super.createRecord(usuario);
    const { id } = await super.getOneRecord('*', { email });
    usuario.setId(id);

    const token = tokens.verificacaoEmail.cria(usuario.id);
    const endereco = this.geraEndereco('/usuario/verifica-email/', token);
    const emailVerificacao = new EmailVerificacao(usuario, endereco);
    emailVerificacao.enviaEmail().catch(console.log);
  }

  async validateEmail(id) {
    await super.updateRecord({ emailVerificado: true }, id);
  }

  async forgotPassword(email) {
    const usuario = await super.getOneRecord('*', { email });
    if (usuario) {
      const token = tokens.redefinicaoSenha.cria(usuario.id);
      const endereco = this.geraEndereco('/usuario/redefinir-senha/', token);
      const emailRedefinicaoSenha = new EmailRedefinicaoSenha(
        usuario,
        endereco
      );
      emailRedefinicaoSenha.enviaEmail().catch(console.log);
    }
  }

  async resetPassword(senha, id) {
    const usuario = new Usuario({ senha });
    await usuario.setSenha();
    await super.updateRecord({ senhaHash: usuario.senhaHash }, id);
  }
}

module.exports = UsuarioServices;
