import type { TimeLike } from 'node:fs';

export type CategorizableJobAtrrs = keyof Pick<Job, 'category' | 'job_type'>;
export interface Job {
  id: string;
  url: string;
  title: string;
  company_name: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: TimeLike;
  candidate_required_location: string;
  salary: string;
  description: string;
  company_logo_url: string;
}
export interface JobsListResponse {
  '0-legal-notice': string;
  'job-count': number;
  jobs: Job[];
}
