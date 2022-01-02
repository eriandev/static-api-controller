import fetch from 'node-fetch';
import { writeJSON } from '@shared/file';
import { API_PUBLIC_PATH, REMOTIVE_API_URL } from '@shared/constants';
import type { Job, JobsListRespose } from '@types';

async function updateJobsList(): Promise<void> {
  const REMOTIVE_JOBS_LIST_PATH = `${API_PUBLIC_PATH}/remotive/index.json`;

  try {
    const response = await fetch(REMOTIVE_API_URL);
    const jobsResponse: JobsListRespose = await response.json();
    const paginateArguments = {
      jobsList: jobsResponse.jobs,
      pathBase: `${API_PUBLIC_PATH}/remotive/`,
    };

    writeJSON(REMOTIVE_JOBS_LIST_PATH, JSON.stringify(jobsResponse));

    paginateJobsList(paginateArguments);
  } catch (error) {
    console.error(error);
  }
}

function paginateJobsList({ jobsList, pathBase }: { jobsList: Job[]; pathBase: string }): void {
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

    writeJSON(`${pathBase + index}/index.json`, JSON.stringify(pageContent));

    initBlock += 10;
    endBlock += 10;
  }
}

export default updateJobsList;
