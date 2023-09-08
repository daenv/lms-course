import mysql, { Pool } from 'mysql2/promise';

class databaseService {
   pool: Pool | null;

   constructor() {
      this.pool = null;
   }
   public createPool = (): void => {
      this.pool = mysql.createPool({
         host: process.env.MYSQL_HOST,
         user: process.env.MYSQL_USER,
         password: process.env.MYSQL_PASS,
         database: process.env.MYSQL_DB,
         connectionLimit: 10 || process.env.MYSQL_CONNECTION_LIMIT,
      });
   };
   getPool = (databaseName: string) => {
      const pool = this.pool;

      if (!pool) {
         throw new Error(`Pool for \`${databaseName}\` is not defined`);
      }

      return pool;
   };
}
export default new databaseService();