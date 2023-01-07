import { slugify } from '@/shared/utils.ts';
import { uploadChanges } from '@/shared/api.ts';
import { emptyDirectory, writeJSON } from '@/shared/file.ts';
import { API_PUBLIC_PATH, API_URL, JOBS_API_URL } from '@/shared/constants.ts';
import type { CategorizableJobAtrrs, Job, JobsListResponse } from './types.ts';

export async function main(moduleName: string): Promise<void> {
  const REMOTIVE_JOBS_LIST_PATH = `${API_PUBLIC_PATH}/remotive`;

  try {
    const response = await fetch(JOBS_API_URL);
    const { jobs }: JobsListResponse = await response.json();
    const paginateArguments = {
      jobsList: jobs,
      pathBase: `${API_PUBLIC_PATH}/remotive/`
    }

    await emptyDirectory(REMOTIVE_JOBS_LIST_PATH);
    await Promise.allSettled([
      saveMetadata(JOBS_API_URL),
      categorizeJobsByLocation(jobs),
      paginateJobsList(paginateArguments),
      categorizeJobsListBy('category', jobs),
      categorizeJobsListBy('job_type', jobs),
    ]);

    uploadChanges(moduleName);
  } catch (error) {
    console.error(`[sac:error] ${error as string}`)
  }
}

async function paginateJobsList ({ jobsList, pathBase }: { jobsList: Job[], pathBase: string }): Promise<void> {
  const JOB_COUNT = jobsList.length
  const TOTAL_PAGES = Math.ceil(jobsList.length / 10)

  let initBlock = 0
  let endBlock = 10

  for (let index = 1; index <= TOTAL_PAGES; index++) {
    const prevPage = { prev: `${API_URL}/remotive/${index - 1}` }
    const nextPage = { next: `${API_URL}/remotive/${index + 1}` }
    const pageContent = {
      job_count: JOB_COUNT,
      total_pages: TOTAL_PAGES,
      jobs_per_page: 10,
      ...(index > 1 && prevPage),
      ...(index < TOTAL_PAGES && nextPage),
      results: jobsList.slice(initBlock, endBlock)
    }

    await writeJSON(`${pathBase + index.toString()}/index.json`, JSON.stringify(pageContent))

    initBlock += 10
    endBlock += 10
  }
}

async function categorizeJobsListBy (category: CategorizableJobAtrrs, jobsList: Job[]): Promise<void> {
  const cateValues: string[] = []

  for (const job of jobsList) {
    const slugifyCategory = slugify(job[category])
    if (!cateValues.includes(slugifyCategory)) cateValues.push(slugifyCategory)
  }

  for (const value of cateValues) {
    const categorizedJobsList = jobsList.filter((job) => {
      const slugifyCategory = slugify(job[category])
      return slugifyCategory === value
    })
    const paginateArguments = {
      jobsList: categorizedJobsList,
      pathBase: `${API_PUBLIC_PATH}/remotive/${slugify(category)}/${value}/`
    }

    await paginateJobsList(paginateArguments)
    console.info(`[sac] ${value} sub-category updated`)
  }

  const pageContent = {
    tag_count: cateValues.length,
    tags: cateValues
  }

  await writeJSON(`${API_PUBLIC_PATH}/remotive/${slugify(category)}/index.json`, JSON.stringify(pageContent))
  console.info(`[sac] ${category} category completed`)
}

async function categorizeJobsByLocation(jobsList: Job[]): Promise<void> {
  const locationList = ['Worldwide', 'USA Only', 'Other Locations'];
  const locationListLowered = locationList.map((tag) => tag.toLocaleLowerCase());

  for (const location of locationListLowered) {
    const specifiLocationList = jobsList.filter((job) => location === job.candidate_required_location.toLowerCase());
    const otherLocationsList = jobsList.filter((job) => {
      const candidateRequiredLocation = job.candidate_required_location.toLowerCase();
      return locationListLowered[0] !== candidateRequiredLocation && locationListLowered[1] !== candidateRequiredLocation;
    });
    const categorizedJobsList = location === 'other locations' ? otherLocationsList : specifiLocationList;
    const paginateArguments = {
      jobsList: categorizedJobsList,
      pathBase: `${API_PUBLIC_PATH}/remotive/required-location/${slugify(location)}/`,
    };

    await paginateJobsList(paginateArguments);
    console.log(`[sac] ${location} sub-category updated`);
  }

  const pageContent = {
    tag_count: locationList.length,
    tags: locationList,
  };

  await writeJSON(`${API_PUBLIC_PATH}/remotive/required-location/index.json`, JSON.stringify(pageContent));
  console.log(`[sac] required location category completed`);
}

async function saveMetadata(remotive_api: string): Promise<void> {
  const last_update = new Date().getTime();
  const metadateObject = { last_update, remotive_api };

  await writeJSON(`${API_PUBLIC_PATH}/remotive/index.json`, JSON.stringify(metadateObject));
  console.log(`[sac] metadata saved`);
}
