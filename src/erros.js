class InvalidArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidArgumentError';
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
  }
}

class NotFound extends Error {
  constructor(entidade) {
    const message = `Não foi possível encontrar ${entidade}.`;
    super(message);
    this.name = 'NotFound';
  }
}

class NotAuthorized extends Error {
  constructor() {
    const message = 'Não foi possível acessar esse recurso.';
    super(message);
    this.name = 'NotAuthorized';
  }
}

module.exports = {
  InvalidArgumentError,
  InternalServerError,
  NotFound,
  NotAuthorized,
};
