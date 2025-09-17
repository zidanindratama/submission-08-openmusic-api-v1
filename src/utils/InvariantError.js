const ClientError = require("./ClientError");
class InvariantError extends ClientError {
  constructor(message = "Invalid request") {
    super(message, 400);
    this.name = "InvariantError";
  }
}
module.exports = InvariantError;
