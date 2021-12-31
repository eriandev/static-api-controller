import { writeJSON, readJSON } from '@shared/file';
import { getBrowserAndNewPage } from '@shared/utils';
import { PORTFOLIO_MODULE_PATH } from '@shared/constants';
import type { CleanRepo } from '@types';

async function updateFeaturedList(moduleName: string, username: string): Promise<void> {
  const { browser, page } = await getBrowserAndNewPage();
  await page.goto(`https://github.com/${username}`).catch((err: Error) => console.error(err));

  await page.waitForFunction(() => {
    const pinnedRepos = document.querySelectorAll('ol');
    return pinnedRepos.length;
  });

  const featuredTitles = await page.$$eval('ol.js-pinned-items-reorder-list li', (featuredRepos) => {
    const toText = (element: HTMLElement | null) => (element ? element.innerText.trim() : '');
    return featuredRepos.map((featuredRepo) => toText(featuredRepo.querySelector('a.text-bold')));
  });

  await browser.close();

  const featuredRepos = await getFilteredReposByName(featuredTitles);
  const FEATURED_REPOS_PATH = `${PORTFOLIO_MODULE_PATH}featured/index.json`;

  await writeJSON(FEATURED_REPOS_PATH, JSON.stringify(featuredRepos));
}

async function getFilteredReposByName(names: Array<string>): Promise<CleanRepo[]> {
  const REPOS_PATH = `${PORTFOLIO_MODULE_PATH}repos/index.json`;
  const repos = await readJSON<CleanRepo[]>(REPOS_PATH);

  return repos.filter((repo) => names.includes(repo.name));
}

export default updateFeaturedList;
