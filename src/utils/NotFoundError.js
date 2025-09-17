const ClientError = require("./ClientError");
class NotFoundError extends ClientError {
  constructor(message = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
module.exports = NotFoundError;
