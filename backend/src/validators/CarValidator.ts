import { body, ValidationChain } from 'express-validator';

export const carValidator = (): ValidationChain[] => [
    body('model').notEmpty().withMessage('Model is required'),
    body('releaseYear').notEmpty().withMessage('Release year is required'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('realiseYear').isNumeric().withMessage('Release year must be a number'),
    body('realiseYear').isLength({ min: 4 }).withMessage('Release year must be at least 4 characters long'),
    body('userId').notEmpty().withMessage('User id is required'),
    body('userId').isNumeric().withMessage('User id must be a number'),
    body('userId').isLength({ min: 1 }).withMessage('User id must be at least 1 character long'),
];
