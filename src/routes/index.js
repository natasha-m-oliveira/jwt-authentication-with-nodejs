const bodyParser = require('body-parser');
const auth = require('./authRoute');
const usuarios = require('./usuariosRoute');
const posts = require('./postsRoute');

module.exports = (app) => {
  app.use(bodyParser.json(), auth, usuarios, posts);
};
