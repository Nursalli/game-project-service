class AppError extends Error {
  status = 500;
  errData = {};

  constructor(message, status = 500, errData = {}) {
    super(message);
    this.status = status;
    this.errData = errData;
  }
}

module.exports = {
  AppError
};
