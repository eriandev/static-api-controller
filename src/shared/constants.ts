import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export { version } from '../../package.json';

export const API_PATH = env.API_PATH;
export const MODULES_PATH = path.resolve(__dirname, '../modules');
export const PORTFOLIO_MODULE_PATH = `${API_PATH}public/`;

export const REMOTIVE_API_URL = 'https://remotive.io/api/remote-jobs';
