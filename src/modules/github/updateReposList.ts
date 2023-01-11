import { Octokit } from '@octokit';
import { writeJSON } from '@/shared/file.ts';
import { uploadChanges } from '@/shared/repo.ts';
import { API_PUBLIC_PATH } from '@/shared/constants.ts';
import type { CleanRepo, DirtyRepo } from '@/modules/github/types.ts';

export async function main(moduleName: string, username: string): Promise<void> {
  const REPOS_PATH = `${API_PUBLIC_PATH}/github/repos/index.json`;
  const dirtyRepos = await getAllRepos(username);
  const cleanRepos = getCleanReposList(dirtyRepos);

  await writeJSON(REPOS_PATH, JSON.stringify(cleanRepos));
  await uploadChanges(moduleName);
}

async function getAllRepos(username: string): Promise<DirtyRepo[]> {
  const octokit = new Octokit();
  const { data } = await octokit.rest.repos.listForUser({ username, type: 'owner', per_page: 150 });
  return data as DirtyRepo[];
}

function getCleanReposList(data: DirtyRepo[]): CleanRepo[] {
  return data
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      license: repo.license?.spdx_id,
      language: repo.language,
      fork: repo.fork,
      size: repo.size,
      forks_count: repo.forks_count,
      watchers_count: repo.watchers_count,
      stargazers_count: repo.stargazers_count,
      url: repo.html_url,
      demo: repo.homepage,
      archived: repo.archived,
      disabled: repo.disabled,
      topics: [],
    }))
    .filter((repo) => !repo.disabled && !repo.archived);
}
