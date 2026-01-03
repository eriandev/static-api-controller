import { Octokit } from '@octokit/rest'
import { writeJSON } from '@/shared/file.ts'
import { uploadChanges } from '@/shared/repo.ts'
import { API_PUBLIC_PATH } from '@/shared/constants.ts'
import type { CleanRepo, DirtyRepo } from '@/modules/github/types.ts'

export async function main(moduleName: string, username: string) {
  const REPOS_PATH = `${API_PUBLIC_PATH}/github/repos/index.json`
  const dirtyRepoList = await getAllRepos(username)
  const repoList = normalizeRepoList(dirtyRepoList)

  await writeJSON(REPOS_PATH, JSON.stringify(repoList))
  await uploadChanges(`Update \`${moduleName}\` repos list`)
}

async function getAllRepos(username: string): Promise<DirtyRepo[]> {
  const octokit = new Octokit()
  const { data } = await octokit.rest.repos.listForUser({ username, type: 'owner', per_page: 100 })
  return data
}

function normalizeRepoList(rawRepoList: DirtyRepo[]): CleanRepo[] {
  return rawRepoList
    .filter((repo) => !repo.disabled && !repo.archived)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      size: repo.size,
      url: repo.html_url,
      is_fork: repo.fork,
      license: repo.license,
      homepage: repo.homepage,
      language: repo.language,
      description: repo.description,
      topics: repo.topics ?? [],
      forks: repo.forks_count ?? 0,
      watchers: repo.watchers_count ?? 0,
      stargazers: repo.stargazers_count ?? 0,
    }))
}
