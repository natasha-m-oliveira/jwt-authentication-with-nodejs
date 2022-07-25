const { PostServices } = require('../services');
const postServices = new PostServices();

class PostController {
  static async getAllPosts(req, res, next) {
    try {
      let posts;
      if (req.authenticated) {
        posts = await postServices.getAllRecords();
      } else {
        posts = await postServices.getAllRecords(
          `titulo, SUBSTR(conteudo, 1, 10) || '... Assina para ler mais.'  conteudo`
        );
      }
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async getPostsByUsuario(req, res, next) {
    try {
      const autor = req.user.id;
      const posts = await postServices.getAllRecords('*', { autor });
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req, res, next) {
    try {
      const autor = req.user.id;
      const { titulo, conteudo } = req.body;
      await postServices.createRecord({ titulo, conteudo, autor });

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const id = req.params.id;
      const newData = req.body;

      await postServices.updateRecord(newData, id);
      res.send();
    } catch (err) {
      next(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      await postServices.deleteRecord({ id: req.params.id });
      res.send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PostController;
