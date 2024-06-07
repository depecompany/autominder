import { body } from "express-validator";

export const RegisterValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('username', 'The minium of characters length is 5').isLength({ min: 6 }),
    body('username', 'username does not Empty').not().isEmpty(),
    body('password', 'passoword does notEmpty').notEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
    body('password', 'The maximum password length is 20 characters').isLength({ max: 20 }),
]

export const LoginValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'passoword does notEmpty').notEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
    body('password', 'The maximum password length is 20 characters').isLength({ max: 20 }),
];

