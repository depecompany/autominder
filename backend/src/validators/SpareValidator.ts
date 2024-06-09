import { body, ValidationChain } from 'express-validator';

export const spareValidation = (): ValidationChain[] => [
    body('name').notEmpty().withMessage('Name is required'),
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('name').isLength({ max: 100 }).withMessage('Name must be at most 20 characters long'),
    body('price').notEmpty().withMessage('Price is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('carId').notEmpty().withMessage('Car id is required'),
    body('carId').isNumeric().withMessage('Car id must be a number'),
    body('carId').isLength({ min: 1 }).withMessage('Car id must be at least 1 character long'),
    body('isOriginal').notEmpty().withMessage('Is original is required'),
    body('isOriginal').isBoolean().withMessage('Is original must be a boolean'),
];