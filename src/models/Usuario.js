// const Services = require("..services/Services");
const { InvalidArgumentError } = require("../erros");
const validacoes = require("../validacoes-comuns");
const bcrypt = require("bcrypt");

class Usuario {
  #senha = "";
  constructor(usuario) {
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.#senha = usuario.senha;
    this.emailVerificado = usuario.emailVerificado;
  }

  // async adiciona() {
  //   if (await Usuario.buscaPorEmail(this.email)) {
  //     throw new InvalidArgumentError("O usuário já existe!");
  //   }

  //   await usuariosDao.adiciona(this);
  //   const { id } = await usuariosDao.buscaPorEmail(this.email);
  //   this.id = id;
  // }

  setId(id) {
    this.id = id;
  }

  async createSenhaHash() {
    const custoHash = 12;
    return bcrypt.hash(this.#senha, custoHash);
  }

  async setSenha() {
    validacoes.campoStringNaoNulo(this.#senha, "senha");
    validacoes.campoTamanhoMinimo(this.#senha, "senha", 8);
    validacoes.campoTamanhoMaximo(this.#senha, "senha", 64);

    this.senhaHash = await this.createSenhaHash();
  }

  async valida() {
    validacoes.campoStringNaoNulo(this.nome, "nome");
    validacoes.campoStringNaoNulo(this.email, "email");
    await this.setSenha();
  }

  // async verificaEmail() {
  //   this.emailVerificado = true;
  //   await usuariosDao.modificaEmailVerificado(this, this.emailVerificado);
  // }

  // async deleta() {
  //   return usuariosDao.deleta(this);
  // }

  // static async buscaPorId(id) {
  //   const usuario = await usuariosDao.buscaPorId(id);
  //   if (!usuario) {
  //     return null;
  //   }

  //   return new Usuario(usuario);
  // }

  // static async buscaPorEmail(email) {
  //   const usuario = await usuariosDao.buscaPorEmail(email);
  //   if (!usuario) {
  //     return null;
  //   }

  //   return new Usuario(usuario);
  // }

  // static lista() {
  //   return usuariosDao.lista();
  // }
}

module.exports = Usuario;
