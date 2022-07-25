const controle = require('../controleAcesso');

const metodos = {
  ler: {
    todos: 'readAny',
    apenasSeu: 'readOwn',
  },
  criar: {
    todos: 'createAny',
    apenasSeu: 'createOwn',
  },
  atualizar: {
    todos: 'updateAny',
    apenasSeu: 'updateOwn',
  },
  remover: {
    todos: 'deleteAny',
    apenasSeu: 'deleteOwn',
  },
};

module.exports = (entidade, acao) => (req, res, next) => {
  const permissoesCargo = controle.can(req.user.cargo);
  const acoes = metodos[acao];
  const permissaoTodos = permissoesCargo[acoes.todos](entidade);
  const permissaoApenasSeu = permissoesCargo[acoes.apenasSeu](entidade);
  if (!permissaoTodos.granted && !permissaoApenasSeu.granted) {
    res.status(403).json({
      message: 'Você não possui permissão para realizar está operação.',
    });
  } else {
    req.access = {
      todos: {
        permitido: permissaoTodos.granted,
        atributos: permissaoTodos.attributes,
      },
      apenasSeu: {
        permitido: permissaoApenasSeu.granted,
        atributos: permissaoApenasSeu.attributes,
      },
    };
    next();
  }
};
