import { Browser, chromium, Page } from 'playwright';

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
