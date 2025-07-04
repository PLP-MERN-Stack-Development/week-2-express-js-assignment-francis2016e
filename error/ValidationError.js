import ApiError from './ApiError.js';

class ValidationError extends ApiError {
  constructor(message = 'Validation Error') {
    super(message, 400);
  }
}

export default ValidationError;
