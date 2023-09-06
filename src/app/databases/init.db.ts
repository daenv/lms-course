import log from '@/utils/logger';
import databaseService from './instant.db';
import c from 'config';

const configDB = c.get<{ name: string }>('db');

try {
   databaseService.createPool();
} catch (error) {
   log.error(`Failed to connect to database ${configDB.name}`, error);
}
const DB = databaseService.getPool(configDB.name);
export default DB;
