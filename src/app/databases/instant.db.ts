import c from 'config';
import mysql, { Pool } from 'mysql2/promise';

class DatabaseService {
   public pool: Pool | null;

   constructor() {
      this.pool = null;
   }

   createPool = () => {
      const configDB = c.get<{ host: string; username: string; password: string; name: string }>('db');

      this.pool = mysql.createPool({
         host: configDB.host,
         user: configDB.username,
         password: configDB.password,
         database: configDB.name,
         waitForConnections: true,
         connectionLimit: 10,
         multipleStatements: true,
      });
   };
   getPool = (databaseName: string) => {
      const pool = this.pool;

      if (!pool) {
         throw new Error(`Pool \'${databaseName}\' is not defined`);
      }
      return pool;
   };
}

export default new DatabaseService();
