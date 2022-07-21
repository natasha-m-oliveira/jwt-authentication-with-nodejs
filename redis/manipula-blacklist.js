const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");
const blacklist = require("./blacklist");
// const { promisify } = require("util");
// const existsAsync = promisify(blacklist.exists).bind(blacklist);
// const setAsync = promisify(blacklist.set).bind(blacklist);

function geraTokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

module.exports = {
  adiciona: async (token) => {
    const dataExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await blacklist.set(tokenHash, "", {
      EX: dataExpiracao,
      NX: true,
    });
  },
  contemToken: async (token) => {
    const tokenHash = geraTokenHash(token);
    const result = await blacklist.exists(tokenHash);
    return result === 1;
  },
};
