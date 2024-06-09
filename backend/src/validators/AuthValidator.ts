import { body, ValidationChain } from 'express-validator';

export const registerValidator = (): ValidationChain[] => [
    body('username').notEmpty().withMessage('Username is required'),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('username').isLength({ max: 20 }).withMessage('Username must be at most 20 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('password').matches(/\d/).withMessage('Password must contain a number'),
    body('password').matches(/[a-zA-Z]/).withMessage('Password must contain a letter'),
];


export const loginValidator = (): ValidationChain[] => [
    body('email').isEmail().withMessage('Invalid email'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('password').matches(/\d/).withMessage('Password must contain a number'),
    body('password').matches(/[a-zA-Z]/).withMessage('Password must contain a letter'),
];