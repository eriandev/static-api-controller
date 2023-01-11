import { DOMParser, type HTMLDocument } from 'deno_dom';

export async function useScraper(url: string) {
  const domParser = new DOMParser();
  let scrapedDocument: HTMLDocument | null;

  try {
    const response = await fetch(url);
    const htmlText = await response.text();
    scrapedDocument = domParser.parseFromString(htmlText, 'text/html');
  } catch (error) {
    console.error(error);
  }

  const $ = (query: string) => scrapedDocument?.querySelector(query) ?? null;
  const $$ = (query: string) => scrapedDocument?.querySelectorAll(query) ?? null;

  return { $, $$ };
}
