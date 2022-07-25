const { Router } = require('express');

const autenticacao = require('../middlewares/autenticacao');
const autorizacao = require('../middlewares/autorizacao');
const PostController = require('../controllers/PostController');

const router = Router();

router.get('/post', autenticacao.bearer, PostController.getPostsByUsuario);
router.post('/post', autenticacao.bearer, PostController.createPost);
router.put(
  '/post/:id',
  [autenticacao.bearer, autorizacao(['admin', 'editor'])],
  PostController.updatePost,
);
router.delete(
  '/post/:id',
  [autenticacao.bearer, autorizacao(['admin', 'editor'])],
  PostController.deletePost,
);

module.exports = router;
