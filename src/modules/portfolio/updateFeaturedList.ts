import { Browser, chromium, Page } from 'playwright';
import { writeJSON, readJSON } from '@shared/file';
import { PORTFOLIO_MODULE_PATH } from '@shared/constants';
import { Repo } from './types/Repo';

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

async function getBrowserAndNewPage(): Promise<{ browser: Browser; page: Page }> {
  const browser = await chromium.launch({
    args: [
      // Required for Docker version Puppeteer
      '--no-sandbox',
      '--disable-gpu',
      '--disable-setui-sandbox',
      // This will write shared memory files into
      // /tmp instead of /dev/shm, because Docker's
      // default for /dev/shm is 64MB
      '--disable-dev-shm-usage',
    ],
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  return { browser, page };
}

async function getFilteredReposByName(names: Array<string>): Promise<Repo[]> {
  const REPOS_PATH = `${PORTFOLIO_MODULE_PATH}repos/index.json`;
  const repos = await readJSON<Repo[]>(REPOS_PATH);

  return repos.filter((repo) => names.includes(repo.name));
}

export default updateFeaturedList;
