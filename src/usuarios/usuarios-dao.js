const { promisify } = require("util");
const db = require("../../database");
const { InternalServerError } = require("../erros");

const dbRun = promisify(db.run).bind(db);
const dbGet = promisify(db.get).bind(db);
const dbAll = promisify(db.all).bind(db);

module.exports = {
  async adiciona(usuario) {
    try {
      await dbRun(
        `INSERT INTO usuarios (nome, email, senhaHash) 
        VALUES (?, ?, ?)`,
        [usuario.nome, usuario.email, usuario.senhaHash]
      );
    } catch (err) {
      throw new InternalServerError("Erro ao adicionar o usuário!");
    }
  },

  async buscaPorId(id) {
    try {
      return await dbGet(`SELECT * FROM usuarios WHERE id = ?`, [id]);
    } catch (err) {
      throw new InternalServerError("Não foi possível encontrar o usuário!");
    }
  },

  async buscaPorEmail(email) {
    try {
      return await dbGet(`SELECT * FROM usuarios WHERE email = ?`, [email]);
    } catch (err) {
      throw new InternalServerError("Não foi possível encontrar o usuário!");
    }
  },

  async lista() {
    try {
      return await dbAll(`SELECT * FROM usuarios`);
    } catch (err) {
      throw new InternalServerError("Erro ao listar usuários!");
    }
  },

  async deleta(usuario) {
    try {
      await dbRun(`DELETE FROM usuarios WHERE id = ?`, [usuario.id]);
    } catch (err) {
      throw new InternalServerError("Erro ao deletar o usuário");
    }
  },
};
