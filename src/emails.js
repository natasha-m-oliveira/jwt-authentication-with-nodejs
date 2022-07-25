const nodemailer = require('nodemailer');

const configuracaoEmailProducao = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USUARIO,
    pass: process.env.EMAIL_SENHA,
  },
  secure: true,
};

const configuracaoEmailTeste = (contaTeste) => ({
  host: 'smtp.ethereal.email',
  auth: contaTeste,
});

async function criaConfiguracaoEmail() {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    return configuracaoEmailProducao;
  } else {
    const contaTeste = await nodemailer.createTestAccount();
    return configuracaoEmailTeste(contaTeste);
  }
}

class Email {
  async enviaEmail() {
    const configuracaoEmail = await criaConfiguracaoEmail();
    const transportador = nodemailer.createTransport(configuracaoEmail);
    const info = await transportador.sendMail(this);

    if (process.env.NODE_ENV !== 'production') {
      console.log('URL: ' + nodemailer.getTestMessageUrl(info));
    }
  }
}

class EmailVerificacao extends Email {
  constructor(usuario, endereco) {
    super();
    this.from = 'Blog do Código <noreplay@blogdocodigo.com.br>';
    this.to = usuario.email;
    this.subject = 'Confirmação de E-mail';
    this.text = `Bem-vindo(a), ${usuario.nome}. Confirme seu e-mail (${usuario.email}) rapidinho para que você possar continuar usando o Blog do Código. É só clicar no botão abaixo ;) ${endereco}`;
    this.html = `
      <h1>Bem-vindo(a), ${usuario.nome}.</h1>
      <p>Confirme seu e-mail (${usuario.email}) rapidinho para que você possar continuar usando o Blog do Código. É só clicar no botão abaixo ;)</p>
      <a
        href="${endereco}"
        style="background-color:#0069d9;
          border:1px solid #0062cc;
          border-color:#0062cc;
          border-radius:30px;
          border-width:1px;
          color:#ffffff;
          display:inline-block;
          font-size:14px;
          font-weight:bold;
          letter-spacing:0px;
          line-height:normal;
          padding:12px 45px 12px 45px;
          text-align:center;
          text-decoration:none;
          border-style:solid">Confirmar e-mail</a>
    `;
  }
}

class EmailRedefinicaoSenha extends Email {
  constructor(usuario, endereco) {
    super();
    this.from = 'Blog do Código <noreplay@blogdocodigo.com.br>';
    this.to = usuario.email;
    this.subject = 'Complete a solicitação de redefinição de senha';
    this.text = `Olá, ${usuario.nome}. Vamos redefinir sua senha para que você continue lendo.`;
    this.html = `
      <h1>Olá, ${usuario.nome}.</h1>
      <p>Vamos redefinir sua senha para que você continue lendo.</p>
      <a
        href="${endereco}"
        style="background-color:#0069d9;
          border:1px solid #0062cc;
          border-color:#0062cc;
          border-radius:30px;
          border-width:1px;
          color:#ffffff;
          display:inline-block;
          font-size:14px;
          font-weight:bold;
          letter-spacing:0px;
          line-height:normal;
          padding:12px 45px 12px 45px;
          text-align:center;
          text-decoration:none;
          border-style:solid">Redefinir senha</a>
    `;
  }
}

module.exports = { EmailVerificacao, EmailRedefinicaoSenha };
