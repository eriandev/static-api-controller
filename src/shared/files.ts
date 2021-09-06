import { PathLike, readdirSync } from 'fs';

export function getDirectoriesNames(source: PathLike): Array<string> {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}
