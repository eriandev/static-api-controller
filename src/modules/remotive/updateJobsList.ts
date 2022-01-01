import fetch from 'node-fetch';
import { writeJSON } from '@shared/file';
import { PORTFOLIO_MODULE_PATH, REMOTIVE_API_URL } from '@shared/constants';

async function updateJobsList(): Promise<void> {
  const REMOTIVE_JOBS_LIST_PATH = `${PORTFOLIO_MODULE_PATH}remotive/index.json`;

  try {
    const response = await fetch(REMOTIVE_API_URL);
    await writeJSON(REMOTIVE_JOBS_LIST_PATH, JSON.stringify(await response.json()));
  } catch (error) {
    console.error(error);
  }
}

export default updateJobsList;
