import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

let response = {
    'status': 400,
    'message': 'Bad Request',
    'data': 'invalid data'
}

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(response.status).json(response);
        }
        next();
    };
};

export default validate;
