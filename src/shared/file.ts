import { existsSync, readdirSync } from 'node:fs';
import { rm, mkdir, writeFile, readFile } from 'node:fs/promises';

export function getDirectoriesNames(source: string): Array<string> {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export async function emptyDirectory(directoryPath: string): Promise<void> {
  await rm(directoryPath, { recursive: true });
}

export async function writeJSON(filePath: string, data: string): Promise<void> {
  const DIRECTORY_PATH = filePath
    .split('/', filePath.split('/').length - 1)
    .join('/')
    .toString();

  try {
    if (!existsSync(DIRECTORY_PATH)) await mkdir(DIRECTORY_PATH, { recursive: true });
    await writeFile(filePath, data);
  } catch (error) {
    console.error(`[sac:error] ${error}`);
  }
}

export async function readJSON<T = string>(filePath: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(filePath, { encoding: 'utf-8' }));
  } catch (error) {
    return null;
  }
}
