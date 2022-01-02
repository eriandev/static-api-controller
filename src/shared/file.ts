import { readdirSync, existsSync, mkdirSync, writeFile, readFile } from 'fs';
import type { PathLike } from 'fs';

export function getDirectoriesNames(source: PathLike): Array<string> {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export function writeJSON(filePath: PathLike, data: string): Promise<void> {
  const FILE_PATH = filePath.toString();
  const DIRECTORY_NAME = FILE_PATH.split('/').slice(-2)[0];
  const DIRECTORY_PATH = FILE_PATH.split('/', FILE_PATH.split('/').length - 1)
    .join('/')
    .toString();

  return new Promise((resolve, reject) => {
    if (!existsSync(DIRECTORY_PATH)) mkdirSync(DIRECTORY_PATH);

    writeFile(filePath, data, (err) => {
      if (err) return reject(err);
      resolve(console.log(`[sac] ${DIRECTORY_NAME} file updated`));
    });
  });
}

export function readJSON<T = string>(filePath: PathLike): Promise<T> {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf-8', (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
}
