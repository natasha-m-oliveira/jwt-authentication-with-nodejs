const AccessControl = require('accesscontrol');
const controle = new AccessControl();

controle
  .grant('assinante')
  .readAny('post', ['id', 'titulo', 'conteudo', 'autor'])
  .readAny('usuario', ['nome'])
  .updateOwn('usuario');

controle
  .grant('editor')
  .extend('assinante')
  .createOwn('post')
  .updateOwn('post')
  .deleteOwn('post');

controle
  .grant('admin')
  .readAny('post')
  .createAny('post')
  .updateAny('post')
  .deleteAny('post')
  .readAny('usuario')
  .updateAny('usuario')
  .deleteAny('usuario');

module.exports = controle;
