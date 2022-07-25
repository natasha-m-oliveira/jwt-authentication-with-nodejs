const express = require("express");
const routes = require("./src/routes");
require("dotenv").config();
require("./database");
require("./src/estrategiasAutenticacao");
require("./redis/blocklistAccessToken");
require("./redis/allowlistRefreshToken");

const port = 3000;
const app = express();

routes(app);
app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;
