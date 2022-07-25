const { InvalidArgumentError, InternalServerError } = require('../erros');
const { PostServices } = require('../services');
const postServices = new PostServices();

class PostController {
  static async getAllPosts(req, res) {
    try {
      const posts = await postServices.getAllRecords();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getPostsByUsuario(req, res) {
    try {
      const autor = req.user.id;
      const posts = await postServices.getAllRecords({ autor });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createPost(req, res) {
    try {
      const autor = req.user.id;
      const { titulo, conteudo } = req.body;
      await postServices.createRecord({ titulo, conteudo, autor });

      res.status(201).send();
    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        res.status(422).json({ message: err.message });
      } else if (err instanceof InternalServerError) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }

  static async updatePost(req, res) {
    try {
      const id = req.params.id;
      const newData = req.body;

      await postServices.updateRecord(newData, id);
      res.send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deletePost(req, res) {
    try {
      await postServices.deleteRecord({
        id: req.params.id,
        autor: req.user.id,
      });
      res.send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = PostController;
