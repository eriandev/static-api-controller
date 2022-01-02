import fetch from 'node-fetch';
import { writeJSON } from '@shared/file';
import { PORTFOLIO_MODULE_PATH, REMOTIVE_API_URL } from '@shared/constants';
import type { Job, JobsListRespose } from '@types';

async function updateJobsList(): Promise<void> {
  const REMOTIVE_JOBS_LIST_PATH = `${PORTFOLIO_MODULE_PATH}remotive/index.json`;

  try {
    const response = await fetch(REMOTIVE_API_URL);
    const jobsResponse: JobsListRespose = await response.json();

    writeJSON(REMOTIVE_JOBS_LIST_PATH, JSON.stringify(jobsResponse));

    paginateJobsList(jobsResponse.jobs);
  } catch (error) {
    console.error(error);
  }
}

function paginateJobsList(jobsList: Job[]): void {
  const TOTAL_PAGES = Math.ceil(jobsList.length / 10);

  let initBlock = 0;
  let endBlock = 10;

  for (let index = 1; index <= TOTAL_PAGES; index++) {
    const prevPage = { prev: `https://erianvc.github.io/api/remotive/${index - 1}` };
    const nextPage = { next: `https://erianvc.github.io/api/remotive/${index + 1}` };
    const pageContent = {
      total_pages: TOTAL_PAGES,
      jobs_per_page: 10,
      ...(index > 1 && prevPage),
      ...(index < TOTAL_PAGES && nextPage),
      results: jobsList.slice(initBlock, endBlock),
    };

    writeJSON(`${PORTFOLIO_MODULE_PATH}remotive/${index}/index.json`, JSON.stringify(pageContent));

    initBlock += 10;
    endBlock += 10;
  }
}

export default updateJobsList;
