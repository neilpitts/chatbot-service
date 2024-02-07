import { DatabaseService } from '../Database/databaseService';

type User = {
    id: string;
    name: string;
    email: string;
    // add other user properties here
  };

class UserService {
    async createUser(userData: User) {
      //return DatabaseService.create(userData);
    }
  
    async getUserById(userId: string) {
      //return DatabaseService.retrieve(userId);
    }
  
    /*
    async updateUserById(userId: string, userUpdates: Partial<User>): Promise<User> {
      return DatabaseService.update(userId, userUpdates);
    }
    */
  
    async deleteUserById(userId: string) {
      //return DatabaseService.delete(userId);
    }
  }