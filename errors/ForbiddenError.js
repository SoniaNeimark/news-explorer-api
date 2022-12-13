//  403
class ForbiddenError extends Error {
  constructor(message, name) {
    super(message);
    this.statusCode = 403;
    this.name = name && name;
  }
}

module.exports = ForbiddenError;
