import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';

export async function getBrowserAndNewPage(): Promise<{ browser: Browser; page: Page }> {
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

export function getTimeStamp(date = new Date()) {
  const CURRENT_DATE = date.getDate().toString().padStart(2, '00');
  const CURRENT_MONTH = (date.getMonth() + 1).toString().padStart(2, '00');
  const CURRENT_TIME = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '00')}`;

  return `${CURRENT_DATE}/${CURRENT_MONTH}/${date.getFullYear()} ${CURRENT_TIME} GTM-0500`;
}

export function slugify(text: string): string {
  return text
    .replaceAll('_', '-')
    .toLowerCase()
    .split(' ')
    .filter((word) => /[a-z0-9]/.test(word))
    .join('-');
}
