import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError';
import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';

// for environment
dotenv.config();

const __token__ = process.env.SERVICE_TOKEN || 'PG-oOzZoAK!xWVzZIvBTe0GG?BOZFvGHQvZeS4iIj2gvgAJ72ySWGiXDwR9JiPWV';

export const tokenAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check for the authorization header
  const authHeader = req.headers['authorization'];
  // Extract the token. Typically, the authorization header is "Bearer TOKEN"
  const token = authHeader && authHeader.split(' ')[1];

  
  if (token === null && token !== __token__) {
    throw new ApiError(401, 'No token provided.');
  }

  // Verify the token with the secret key -- for use in the future maybe
  // just checking if its passed and the exact token that was passed out by me, for now
  /*
  jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
    if (err) {
      throw new ApiError(401, 'No token provided.');
    }
    

    // If verification is successful, attach the user payload to the request
    // req.user = user;

    // Proceed to the next middleware/function
    next();
  });*/
  next();
};
