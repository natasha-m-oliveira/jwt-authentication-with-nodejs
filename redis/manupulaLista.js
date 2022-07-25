module.exports = (lista) => {
  return {
    async adiciona(chave, valor, dataExpiracao) {
      await lista.set(chave, valor, {
        EX: dataExpiracao,
        NX: true,
      });
    },

    async buscaValor(chave) {
      return await lista.get(chave);
    },

    async contemChave(chave) {
      const result = await lista.exists(chave);
      return result === 1;
    },

    async deleta(chave) {
      await lista.del(chave);
    },
  };
};
