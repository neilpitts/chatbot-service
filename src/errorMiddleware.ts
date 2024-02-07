// errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
          output: err.message,
          errors: err.errors,
        });
      } else {
        console.error(err); // Log the error for server-side review
        res.status(500).json({
          output: 'An unexpected error occurred.',
        });
      }
}
