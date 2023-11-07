/**
 * HTTP Error class extends from Error (name, msg) with statusCode
 */
class HTTPError extends Error {
  constructor({ name, message, code }) {
    super();
    this.name = name;
    this.message = message;
    this.statusCode = code;
  }
}

export default HTTPError;
