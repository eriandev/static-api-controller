import { readdirSync, writeFile, readFile } from 'fs';
import type { PathLike } from 'fs';

export function getDirectoriesNames(source: PathLike): Array<string> {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export function writeJSON(filePath: PathLike, data: string): Promise<void> {
  const FILE_NAME = filePath.toString().split('/').slice(-2)[0];

  return new Promise((resolve, reject) => {
    writeFile(filePath, data, (err) => {
      if (err) return reject(err);
      resolve(console.log(`[sac] ${FILE_NAME} file updated`));
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
