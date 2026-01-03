import type { RestEndpointMethodTypes } from '@octokit/rest'

export type CleanRepo = Pick<DirtyRepo, SelectedRepoAttrs> & ExtraRepoAttrs
export type DirtyRepo = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0]
export type ExtraRepoAttrs = {
  url: string
  forks: number
  topics: string[]
  is_fork: boolean
  watchers: number
  stargazers: number
}

type SelectedRepoAttrs =
  | 'id'
  | 'name'
  | 'size'
  | 'homepage'
  | 'description'
  | 'language'
  | 'license'
