const { InvalidArgumentError } = require('./erros');

module.exports = {
  campoStringNaoNulo: (valor, nome) => {
    if (typeof valor !== 'string' || valor === 0)
      throw new InvalidArgumentError(`O campo ${nome} é obrigatório.`);
  },

  campoTamanhoMinimo: (valor, nome, minimo) => {
    if (valor.length < minimo)
      throw new InvalidArgumentError(
        `O campo ${nome} deve ter pelo menos ${minimo} caracteres.`
      );
  },

  campoTamanhoMaximo: (valor, nome, maximo) => {
    if (valor.length > maximo)
      throw new InvalidArgumentError(
        `O campo ${nome} não deve ter mais ${maximo} caracteres.`
      );
  },
};
