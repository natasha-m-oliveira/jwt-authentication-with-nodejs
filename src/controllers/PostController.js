const Post = require("../models/posts-modelo");
const { InvalidArgumentError, InternalServerError } = require("../erros");

module.exports = {
  async adiciona(req, res) {
    try {
      const post = new Post(req.body);
      await post.adiciona();

      res.status(201).send(post);
    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        res.status(422).json({ message: err.message });
      } else if (err instanceof InternalServerError) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  async lista(req, res) {
    try {
      const posts = await Post.listaPorAutor(req.user.id);
      res.send(posts);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  async obterDetalhes(req, res) {
    try {
      const post = await Post.buscaPorId(req.params.id, req.user.id);
      res.json(post);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  async remover(req, res) {
    try {
      const post = await Post.buscaPorId(req.params.id, req.user.id);
      post.remover();
      res.status(204);
      res.end();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
