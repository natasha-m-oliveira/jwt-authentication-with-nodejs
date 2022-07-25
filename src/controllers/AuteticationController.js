const tokens = require('../tokens');

class AuteticationController {
  static async login(req, res, next) {
    try {
      const accessToken = tokens.access.cria(req.user.id);
      const refreshToken = await tokens.refresh.cria(req.user.id);
      res.set('Authorization', accessToken);
      res.status(200).json({ refreshToken });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req, res, next) {
    try {
      const token = req.token;
      await tokens.access.invalida(token);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuteticationController;
