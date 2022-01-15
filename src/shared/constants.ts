import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export { version } from '../../package.json';

export const API_URL = env.API_URL;
export const API_PATH = env.API_PATH;
export const API_PUBLIC_PATH = `${API_PATH}/public`;
export const MODULES_PATH = path.resolve(__dirname, '../modules');

export const JOBS_API_URL = env.JOBS_API_URL ?? '';
