const { createClient } = require("redis");
const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");
const manipulaLista = require("./manupulaLista");

const client = createClient({ prefix: "blocklistAccessToken:" });
client.on("connect", () => console.log("Connected to Redis!"));
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

const manipulaBlocklist = manipulaLista(client);

function geraTokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

module.exports = {
  async adiciona(token) {
    const dataExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await manipulaBlocklist.adiciona(tokenHash, "", dataExpiracao);
  },
  async contemToken(token) {
    const tokenHash = geraTokenHash(token);
    return manipulaBlocklist.contemChave(tokenHash);
  },
};
