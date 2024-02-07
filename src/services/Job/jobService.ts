import { DatabaseService } from '../Database/databaseService';

interface JobInfo {
    id: string;
    name: string;
  };

  interface User {
    id: string;
    name: string;
    email: string;
    // add other user properties here
  };

export class JobService {
    static getUserJobInfo(id: Number): Promise<JobInfo[]> {
        return DatabaseService.getUserProgramByProgramId(id);
    }

    /*
    async createUser(userData: User): Promise<User> {
      return DatabaseService.create(userData);
    }
    */
  

    /*
    async getUserById(userId: string): Promise<User | null> {
      return DatabaseService.retrieve(userId);
    }
    */
  
    /*
    async updateUserById(userId: string, userUpdates: Partial<User>): Promise<User> {
      return DatabaseService.update(userId, userUpdates);
    }
    */
  
    /*
    async deleteUserById(userId: string): Promise<void> {
      return DatabaseService.delete(userId);
    }
    */
  }