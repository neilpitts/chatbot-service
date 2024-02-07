

import { body, ValidationChain } from 'express-validator';

export const chatValidations: ValidationChain[] = [
    body('chats.*.sender').notEmpty().withMessage('Sender is required'),
    body('chats.*.content').notEmpty().withMessage('Content is required'),
    body('session_id').isUUID().withMessage('Session ID must be a valid UUID'),
    // body('context.enrollment_record.job_id').isInt().withMessage('Job ID must be an integer'),
    // body('context.student.id').isInt().withMessage('Student ID must be an integer'),
    body('context.student.email').isEmail().withMessage('Student email must be a valid email'),
    // ... additional validation chains
  ];
