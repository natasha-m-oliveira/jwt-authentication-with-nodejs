const { Router } = require('express');

const autenticacao = require('../middlewares/autenticacao');
const autorizacao = require('../middlewares/autorizacao');
const tentarAutenticar = require('../middlewares/tentarAutenticar');
const tentarAutorizar = require('../middlewares/tentarAutorizar');
const PostController = require('../controllers/PostController');

const router = Router();

router.get(
  '/post',
  [tentarAutenticar, tentarAutorizar('post', 'ler')],
  PostController.getAllPosts
);
router.post(
  '/post',
  [autenticacao.bearer, autorizacao('post', 'criar')],
  PostController.createPost
);
router.put(
  '/post/:id',
  [autenticacao.bearer, autorizacao('post', 'atualizar')],
  PostController.updatePost
);
router.delete(
  '/post/:id',
  [autenticacao.bearer, autenticacao.local, autorizacao('post', 'remover')],
  PostController.deletePost
);

module.exports = router;
