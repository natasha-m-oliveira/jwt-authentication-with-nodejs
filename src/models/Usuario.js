const validacoes = require('../validacoes-comuns');
const bcrypt = require('bcrypt');

class Usuario {
  #senha = '';
  constructor(usuario) {
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.#senha = usuario.senha;
    this.emailVerificado = usuario.emailVerificado;
  }

  setId(id) {
    this.id = id;
  }

  async createSenhaHash() {
    const custoHash = 12;
    return bcrypt.hash(this.#senha, custoHash);
  }

  async setSenha() {
    validacoes.campoStringNaoNulo(this.#senha, 'senha');
    validacoes.campoTamanhoMinimo(this.#senha, 'senha', 8);
    validacoes.campoTamanhoMaximo(this.#senha, 'senha', 64);

    this.senhaHash = await this.createSenhaHash();
  }

  async valida() {
    validacoes.campoStringNaoNulo(this.nome, 'nome');
    validacoes.campoStringNaoNulo(this.email, 'email');
    await this.setSenha();
  }
}

module.exports = Usuario;
