
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = 404;
    this.name = `Not Found`;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
    this.name = `Bad Request`;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(`Data validation error`);
    this.code = 400;
    this.name = `Validation Error`;
    this.messages = message.map((err) => {
      return {
        field: err.fieldName,
        message: err.errorMessage
      };
    });
  }
}
module.exports = {
  NotFoundError,
  BadRequest,
  ValidationError
};
