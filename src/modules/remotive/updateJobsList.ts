import fetch from 'node-fetch';
import { slugify } from '@shared/utils';
import { uploadChanges } from '@shared/api';
import { emptyDirectory, writeJSON } from '@shared/file';
import { API_URL, API_PUBLIC_PATH, JOBS_API_URL } from '@shared/constants';
import type { Job, JobsListRespose, CategorizableJobAtrrs } from '@types';

async function updateJobsList(moduleName: string): Promise<void> {
  const REMOTIVE_JOBS_LIST_PATH = `${API_PUBLIC_PATH}/remotive`;

  try {
    const response = await fetch(JOBS_API_URL);
    const { jobs }: JobsListRespose = await response.json();
    const paginateArguments = {
      jobsList: jobs,
      pathBase: `${API_PUBLIC_PATH}/remotive/`,
    };

    await emptyDirectory(REMOTIVE_JOBS_LIST_PATH);

    await paginateJobsList(paginateArguments);
    await categorizeJobsListBy('category', jobs);
    await categorizeJobsListBy('job_type', jobs);

    uploadChanges(moduleName);
  } catch (error) {
    console.error(`[sac:error] ${error}`);
  }
}

async function paginateJobsList({ jobsList, pathBase }: { jobsList: Job[]; pathBase: string }): Promise<void> {
  const TOTAL_PAGES = Math.ceil(jobsList.length / 10);

  let initBlock = 0;
  let endBlock = 10;

  for (let index = 1; index <= TOTAL_PAGES; index++) {
    const prevPage = { prev: `${API_URL}/remotive/${index - 1}` };
    const nextPage = { next: `${API_URL}/remotive/${index + 1}` };
    const pageContent = {
      total_pages: TOTAL_PAGES,
      jobs_per_page: 10,
      ...(index > 1 && prevPage),
      ...(index < TOTAL_PAGES && nextPage),
      results: jobsList.slice(initBlock, endBlock),
    };

    await writeJSON(`${pathBase + index}/index.json`, JSON.stringify(pageContent));

    initBlock += 10;
    endBlock += 10;
  }
}

async function categorizeJobsListBy(category: CategorizableJobAtrrs, jobsList: Job[]): Promise<void> {
  const cateValues: string[] = [];

  for (const job of jobsList) {
    const slugifyCategory = slugify(job[category]);
    if (slugifyCategory) !cateValues.includes(slugifyCategory) && cateValues.push(slugifyCategory);
  }

  for (const value of cateValues) {
    const categorizedJobsList = jobsList.filter((job) => {
      const slugifyCategory = slugify(job[category]);
      return slugifyCategory === value;
    });
    const paginateArguments = {
      jobsList: categorizedJobsList,
      pathBase: `${API_PUBLIC_PATH}/remotive/${slugify(category)}/${value}/`,
    };

    await paginateJobsList(paginateArguments);
    console.log(`[sac] ${value} sub-category updated`);
  }

  console.log(`[sac] ${category} category completed`);
}

export default updateJobsList;
