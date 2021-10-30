import { Octokit } from '@octokit/rest';
import { writeJSON } from '@shared/file';
// import { uploadChanges } from '@shared/api';
import { PORTFOLIO_MODULE_PATH } from '@shared/constants';
import { CleanRepo, DirtyRepo } from '@types';

const octokit = new Octokit();
const REPOS_PATH = `${PORTFOLIO_MODULE_PATH}repos/index.json`;

async function updateReposList(moduleName: string, username: string): Promise<void> {
  const { data } = await octokit.rest.repos.listForUser({ username });

  await writeJSON(REPOS_PATH, JSON.stringify(getCleanReposList(data)));
  // uploadChanges(moduleName);
}

function getCleanReposList(data: DirtyRepo[]): CleanRepo[] {
  return data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    license: repo.license?.spdx_id,
    language: repo.language,
    archived: repo.archived,
    fork: repo.fork,
    size: repo.size,
    forks_count: repo.forks_count,
    watchers_count: repo.watchers_count,
    stargazers_count: repo.stargazers_count,
    url: repo.html_url,
    demo: repo.homepage,
  }));
}

export default updateReposList;
