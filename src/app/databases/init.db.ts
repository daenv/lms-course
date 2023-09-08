import databaseService from './instant.db';
import log from '../utils/logger';

try {
   databaseService.createPool();
} catch (error) {
   log.error(`Error while connecting to database: ${error}`);
}

const DB = databaseService.getPool('instant');

export default DB;
