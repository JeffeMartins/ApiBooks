import {IDatabaseConfig} from '../../interfaces/database/IDatabaseConnection';
export const configMongo:IDatabaseConfig={databaseName:process.env.MONGODB_DATABASE || 'bookStore',username:process.env.DB_USER || '',password:process.env.DB_PASSWORD || ''};
