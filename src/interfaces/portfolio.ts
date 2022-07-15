import type { PathLike } from 'node:fs';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

export type CleanRepo = Partial<Pick<DirtyRepo, SelectedRepoAttrs>> & ExtraRepoAttrs;
export type DirtyRepo = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0];

type SelectedRepoAttrs = 'id' | 'size' | 'fork' | 'description' | 'stargazers_count' | 'forks_count' | 'watchers_count' | 'language' | 'archived' | 'disabled';
type ExtraRepoAttrs = { name: string; license?: string; url: PathLike; demo?: PathLike | null; topics: string[] };
