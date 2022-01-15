import { existsSync, readdirSync } from 'fs';
import { mkdir, writeFile, readFile } from 'fs/promises';
import type { PathLike } from 'fs';

export function getDirectoriesNames(source: PathLike): Array<string> {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export async function writeJSON(filePath: PathLike, data: string): Promise<void> {
  const FILE_PATH = filePath.toString();
  const DIRECTORY_PATH = FILE_PATH.split('/', FILE_PATH.split('/').length - 1)
    .join('/')
    .toString();

  try {
    if (!existsSync(DIRECTORY_PATH)) await mkdir(DIRECTORY_PATH, { recursive: true });
    await writeFile(filePath, data);
  } catch (error) {
    console.error(`[sac:error] ${error}`);
  }
}

export async function readJSON<T = string>(filePath: PathLike): Promise<T | null> {
  try {
    return JSON.parse(await readFile(filePath, { encoding: 'utf-8' }));
  } catch (error) {
    return null;
  }
}
