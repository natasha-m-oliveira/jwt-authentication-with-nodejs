class AuteticationController {
  static async login(req, res) {
    try {
      const accessToken = tokens.access.cria(req.user.id);
      const refreshToken = await tokens.refresh.cria(req.user.id);
      res.set("Authorization", accessToken);
      res.status(200).json({ refreshToken });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async logout(req, res) {
    try {
      const token = req.token;
      await tokens.access.invalida(token);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = AuteticationController;
