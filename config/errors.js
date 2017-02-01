function weatherError(message) {
  this.name = 'CustomError';
  this.message = message || '';
  var error = new Error(this.message);
  error.name = this.name;
  this.stack = error.stack;
}
weatherError.prototype = Object.create(Error.prototype);

export default weatherError;