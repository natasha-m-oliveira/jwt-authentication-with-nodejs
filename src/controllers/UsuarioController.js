const { UsuarioServices } = require('../services');
const usuarioServices = new UsuarioServices();

class UsuarioController {
  static async getAllUsuarios(req, res, next) {
    try {
      let columns = req.access.todos.permitido
        ? req.access.todos.atributos
        : req.access.apenasSeu.atributos;
      columns.join(', ');
      const usuarios = await usuarioServices.getAllRecords(columns);
      res.json(usuarios);
    } catch (err) {
      next(err);
    }
  }

  static async createUsuario(req, res, next) {
    try {
      const { nome, email, senha, cargo } = req.body;
      await usuarioServices.createRecord({ nome, email, senha, cargo });
      res.status(201).json();
    } catch (err) {
      next(err);
    }
  }

  static async validateEmail(req, res, next) {
    try {
      const { id } = req.user;
      await usuarioServices.validateEmail(id);
      res.json();
    } catch (err) {
      next(err);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await usuarioServices.forgotPassword(email);
      res.json({
        message:
          'Verifique o seu e-mail para prosseguir com a redefinição da senha.',
      });
    } catch (err) {
      next(err);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { senha } = req.body;
      const { id } = req.user;
      await usuarioServices.resetPassword(senha, id);
      res.send({ message: 'Senha atualizada com sucesso.' });
    } catch (err) {
      next(err);
    }
  }

  static async updateUsuario(req, res, next) {
    try {
      const newData = req.body;
      const { id } = req.params;
      await usuarioServices.updateRecord(newData, id);
      res.send();
    } catch (err) {
      next(err);
    }
  }

  static async deleteUsuario(req, res, next) {
    try {
      await usuarioServices.deleteRecord({ id: req.params.id });
      res.send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UsuarioController;
