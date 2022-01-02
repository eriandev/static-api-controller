import type { PathLike, TimeLike } from 'fs';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

declare namespace NodeJS {
  export interface ProcessEnv {
    [key: string]: string;
  }
}

type SelectedRepoAttrs = 'id' | 'size' | 'fork' | 'description' | 'stargazers_count' | 'forks_count' | 'watchers_count' | 'language' | 'archived' | 'disabled';
type ExtraRepoAttrs = { name: string; license?: string; url: PathLike; demo?: PathLike | null; topics: string[] };

export type CleanRepo = Partial<Pick<DirtyRepo, SelectedRepoAttrs>> & ExtraRepoAttrs;
export type DirtyRepo = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0];

export interface Job {
  id: string;
  url: PathLike;
  title: string;
  company_name: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: TimeLike;
  candidate_required_location: string;
  salary: string;
  description: string;
  company_logo_url: PathLike;
}

export interface JobsListRespose {
  '0-legal-notice': string;
  'job-count': number;
  jobs: Job[];
}
