const getVersion = require('../utils/version');

class BaseResponse {
  success;
  message = 'success';
  data = {};
  error = null;
  version = getVersion();

  constructor(success, message, data, error = null) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

class SuccessResponse extends BaseResponse {
  constructor(message, data) {
    super(true, message, data);
  }
}

class ErrorResponse extends BaseResponse {
  constructor(message = 'Internal Server Error', errorData = {}) {
    super(false, message, {}, errorData);
  }
}

module.exports = {
  BaseResponse,
  SuccessResponse,
  ErrorResponse,
};
