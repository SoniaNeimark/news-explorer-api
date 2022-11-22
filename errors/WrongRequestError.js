class WrongRequestError extends Error {
  constructor(message, name) {
    super(message);
    this.statusCode = 400;
    this.name = name && name;
  }
}

module.exports = WrongRequestError;
