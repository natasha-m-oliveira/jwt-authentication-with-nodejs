const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const Services = require('./services/Services');
const { InvalidArgumentError } = require('./erros');
const tokens = require('./tokens');

function verificaUsuario(usuario) {
  if (!usuario) {
    throw new InvalidArgumentError('E-mail ou senha inválidos.');
  }
}

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new InvalidArgumentError('E-mail ou senha inválidos.');
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
    },
    async (email, senha, done) => {
      try {
        const usuario = new Services('usuarios');
        const data = await usuario.getOneRecord({ email });
        verificaUsuario(data);
        await verificaSenha(senha, data.senhaHash);

        done(null, data);
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const id = await tokens.access.verifica(token);
      const usuario = new Services('usuarios');
      const data = await usuario.getOneRecord({ id });
      done(null, data, { token });
    } catch (err) {
      done(err);
    }
  }),
);
