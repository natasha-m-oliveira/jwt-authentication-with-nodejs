const { createClient } = require("redis");
const manipulaLista = require("./manupula-lista");
const client = createClient({
  prefix: "allowlist-refresh-token:",
});
client.on("connect", () => console.log("Connected to Redis!"));
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
module.exports = manipulaLista(client);
