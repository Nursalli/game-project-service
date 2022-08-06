const { ZodError } = require('zod');

const { AppError } = require('../utils/error');

module.exports = {
  validation: (schema) => (req, res, next) => {
    try {
      const { params, query, body } = req;
      schema.parse({ params, query, body });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppError('Validation Error', 400, error.issues);
      }
      throw new AppError('Validation Error', 400);
    }
  },
}

