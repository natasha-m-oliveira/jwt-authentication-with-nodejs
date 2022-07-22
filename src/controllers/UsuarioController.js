const { InvalidArgumentError, InternalServerError } = require("../erros");
const { UsuarioServices } = require("../services");
const usuarioServices = new UsuarioServices();

class UsuarioController {
  static async createUsuario(req, res) {
    const { nome, email, senha } = req.body;
    try {
      await usuarioServices.createRecord({ nome, email, senha });
      res.status(201).json();
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

  static async getAllUsuarios(req, res) {
    try {
      const usuarios = await usuarioServices.getAllRecords();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async validateEmail(req, res) {
    try {
      const { id } = req.user;
      await usuarioServices.validateEmail(id);
      res.status(200).json();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteUsuario(req, res) {
    try {
      // await usuarioServices.deleteRecord({ id: req.params.id });
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
}

module.exports = UsuarioController;
