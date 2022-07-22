const express = require("express");
const routes = require("./src/routes");
require("dotenv").config();
require("./database");
require("./redis/blocklist-access-token");
require("./redis/allowlist-refresh-token");

const port = 3000;
const app = express();

routes(app);
app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;
