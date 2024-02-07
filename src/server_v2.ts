import express, { Request, Response, Express } from 'express';
import { body, ValidationChain } from 'express-validator';
import { errorMiddleware } from './errorMiddleware';
import { ChatController } from './ChatController';
import { tokenAuthMiddleware } from './tokenAuthMiddleware';
import { validate } from './validate';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';



export const chatValidations: ValidationChain[] = [
    body('chats.*.sender').notEmpty().withMessage('Sender is required'),
    body('chats.*.content').notEmpty().withMessage('Content is required'),
    body('session_id').isUUID().withMessage('Session ID must be a valid UUID'),
    // body('context.enrollment_record.job_id').isInt().withMessage('Job ID must be an integer'),
    // body('context.student.id').isInt().withMessage('Student ID must be an integer'),
    body('context.student.email').isEmail().withMessage('Student email must be a valid email'),
    // ... additional validation chains
  ];

export class Server {
  private app: Express;
  private readonly config: { port: number; secretKey: string };
  private chatController: ChatController;

  constructor() {
    this.app = express();
    //  this.config = this.loadConfig();
    this.config = {
        port: 8080,
        secretKey: "NO SECRET USED OR NEEDED"
    }
    this.chatController = new ChatController();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private loadConfig(): { port: number; secretKey: string } {
    // Assuming config.json is in the same directory as your Server.ts file
    const configPath = path.resolve(__dirname, 'config.json');
    const configFile = fs.readFileSync(configPath, 'utf8');

    // Parse the JSON file and return the configuration
    const config = JSON.parse(configFile);
    if (!config.port || !config.secretKey) {
      throw new Error('Configuration file is missing required entries.');
    }

    return {
      port: config.port,
      secretKey: config.secretKey
    }; 
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
    // Add other global middlewares like CORS, compression, etc.
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  private setupRoutes(): void {
    // Define your application routes here
    this.app.post(
      '/v1/conversation/chat',
      tokenAuthMiddleware,
      validate(chatValidations), // Assuming validate is a validation middleware
      (req: Request, res: Response) => this.chatController.handler(req, res)
    );

    // ... setup other routes
    this.app.post(
        '/v1/conversation/end',
        tokenAuthMiddleware,
        (req: Request, res: Response) => this.chatController.handler(req, res)
      );

    // Error middleware should be the last one
    this.app.use(errorMiddleware);
  }

  public start(): void {
    this.app.listen(this.config.port, () => {
      console.log(`Server is running on port ${this.config.port}`);
    });
  }

  // Other methods...
}
