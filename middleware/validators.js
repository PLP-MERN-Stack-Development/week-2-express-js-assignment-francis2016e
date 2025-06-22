// middlewares/validators.js
import { body, validationResult } from 'express-validator';

export const validateProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('inStock').isBoolean().withMessage('inStock must be true or false'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateProductUpdate = [
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('inStock').optional().isBoolean().withMessage('inStock must be true or false'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
