import { Octokit } from '@octokit';
import { writeJSON } from '@/shared/file.ts';
import { uploadChanges } from '@/shared/repo.ts';
import { API_PUBLIC_PATH } from '@/shared/constants.ts';
import { getBrowserAndNewPage } from '@/shared/utils.ts';
import type { CleanRepo, DirtyRepo } from '@/modules/portfolio/types.ts';

export async function main(moduleName: string, username: string): Promise<void> {
  const octokit = new Octokit();
  const REPOS_PATH = `${API_PUBLIC_PATH}/repos/index.json`;
  const { data } = await octokit.rest.repos.listForUser({ username });

  const cleanRepos = getCleanReposList(data as DirtyRepo[]);
  const cleanReposWithTopics = await getReposWithTopics(cleanRepos);

  await writeJSON(REPOS_PATH, JSON.stringify(cleanReposWithTopics));
  uploadChanges(moduleName);
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
    .filter((repo) => !(repo.disabled ?? false) && !(repo.archived ?? false) && !repo.fork); // !repo.disabled && !repo.archived && !repo.fork
}

async function getReposWithTopics(repos: CleanRepo[]): Promise<CleanRepo[]> {
  const { browser, page } = await getBrowserAndNewPage();

  for await (const repo of repos) {
    await page.goto(repo.url.toString()).catch((err: Error) => console.error(err));

    const topics = await page.$$eval('[data-ga-click="Topic, repository page"]', (repoTopics) =>
      repoTopics.map((repoTopic) => {
        const anchor = repoTopic as HTMLElement;
        return anchor.innerText.trim();
      }));

    repo.topics = topics;
  }

  await browser.close();

  return repos;
}
