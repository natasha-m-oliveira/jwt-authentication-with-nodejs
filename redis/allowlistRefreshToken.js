const { createClient } = require("redis");
const manipulaLista = require("./manupulaLista");
const client = createClient({
  prefix: "allowlistRefreshToken:",
});
client.on("connect", () => console.log("Connected to Redis!"));
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
module.exports = manipulaLista(client);
