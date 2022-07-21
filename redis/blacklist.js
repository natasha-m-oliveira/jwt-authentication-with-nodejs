const { createClient } = require("redis");
const client = createClient(6379, "127.0.0.1", { prefix: "blacklist:" });
client.on("connect", () => console.log("Connected to Redis!"));
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
module.exports = client;
