const postsDao = require("../services/PostServices");
const validacoes = require("../validacoes-comuns");

class Post {
  constructor(post) {
    this.id = post.id;
    this.titulo = post.titulo;
    this.conteudo = post.conteudo;
    this.autor = post.autor;
    this.valida();
  }

  valida() {
    validacoes.campoStringNaoNulo(this.titulo, "título");
    validacoes.campoTamanhoMinimo(this.titulo, "título", 5);

    validacoes.campoStringNaoNulo(this.conteudo, "conteúdo");
    validacoes.campoTamanhoMaximo(this.conteudo, "conteúdo", 140);
  }

  adiciona() {
    return postsDao.adiciona(this);
  }

  static listaTodos() {
    return postsDao.listaTodos();
  }

  static async listaPorAutor(id, idAutor) {
    const post = await postsDao.listaPorAutor(id, idAutor);
    if (!post) {
      return null;
    }

    return new Post(post);
  }

  remove() {
    return postsDao.remove(this);
  }
}

module.exports = Post;
