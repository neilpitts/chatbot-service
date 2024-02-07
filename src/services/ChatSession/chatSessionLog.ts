import { DatabaseService } from '../Database/databaseService';
import { Session } from '../../interfaces/session';

export class ChatSessionLog {
    static async create(session: Session): Promise<Boolean> {
        return DatabaseService.createSessionLogEntry(session);
    }
  }