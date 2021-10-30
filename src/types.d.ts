import { PathLike } from 'fs';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

declare namespace NodeJS {
  export interface ProcessEnv {
    [key: string]: string;
  }
}

type SelectedRepoAttrs = 'id' | 'size' | 'fork' | 'description' | 'stargazers_count' | 'forks_count' | 'watchers_count' | 'language' | 'archived';
type ExtraRepoAttrs = { name: string; license?: string; url: PathLike; demo?: PathLike | null };

export declare type CleanRepo = Partial<Pick<DirtyRepo, SelectedRepoAttrs>> & ExtraRepoAttrs;
export declare type DirtyRepo = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0];
