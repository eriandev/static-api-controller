import { useScraper } from '@/services/scraping.ts';
import { readJSON, writeJSON } from '@/shared/file.ts';
import { API_PUBLIC_PATH } from '@/shared/constants.ts';
import type { CleanRepo } from '@/modules/github/types.ts';

export async function main(moduleName: string, username: string): Promise<void> {
  const featuredRepoNameList = await getFeaturedRepoNameList(username);
  const featuredRepoList = await getFilteredReposByName(featuredRepoNameList);
  const FEATURED_REPOS_PATH = `${API_PUBLIC_PATH}/github/repos/featured/index.json`;

  await writeJSON(FEATURED_REPOS_PATH, JSON.stringify(featuredRepoList));
}

async function getFeaturedRepoNameList(username: string) {
  const { $$ } = await useScraper(`https://github.com/${username}`);
  const scrapedNames = $$('.pinned-item-list-item-content .repo');

  return scrapedNames ? Array.from(scrapedNames).map((repoName) => repoName.textContent.trim()) : [];
}

async function getFilteredReposByName(names: string[]): Promise<CleanRepo[]> {
  const REPOS_PATH = `${API_PUBLIC_PATH}/github/repos/index.json`;
  const repos = await readJSON<CleanRepo[]>(REPOS_PATH);

  return repos ? repos.filter((repo) => names.includes(repo.name)) : [];
}
