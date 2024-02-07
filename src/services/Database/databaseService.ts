// DatabaseService.ts
// import { createPool, Pool } from 'mysql2/promise';
import mysql, { Connection, MysqlError, FieldInfo } from 'mysql';
import { Session } from '../../interfaces/session';

type User = {
  id: string;
  name: string;
  email: string;
  // add other user properties here
};

interface JobInfo {
    id: string;
    name: string;
    companyname: string
  };

export class DatabaseService {
  private static connection: Connection = mysql.createConnection({
    host: process.env.DB_HOST || 'dbdev.paragonone.com',
    user: process.env.DB_USER || 'paragonone',
    password: process.env.DB_PASS || 'NzEK3Su1Uonb',
    database: process.env.DB_NAME || 'paragonone'
  });
  
  static async getUserProgramByProgramId(jobId: Number): Promise<JobInfo[]> {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT jobs.name, companies.name
      FROM job_enrollments
      INNER JOIN jobs ON job_enrollments.job_id = jobs.id
      INNER JOIN companies ON jobs.company_id  = companies.id
      where jobs.id = ?
      LIMIT 1;`;

      DatabaseService.connection.query(query, [jobId], 
        (error: MysqlError | null, results: JobInfo[]) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  public static createSessionLogEntry(session: Session): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO chat_session_logs SET ?';
      DatabaseService.connection
        .query(query, session, (error: MysqlError | null, results: any) => {
        if (error) {
          return reject(error);
        }
        resolve(true);
      });
    });
  }
}  

  