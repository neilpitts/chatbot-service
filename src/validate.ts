// validate.ts
// import { Request, Response, NextFunction, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { ApiError } from './ApiError';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(422, 'Validation error', errors.array()));
    }

    next();
  };
};

