import * as shell from 'shelljs';
import { API_PATH } from './constants';

export function uploadChanges(moduleName: string): void {
  shell.cd(API_PATH);
  shell.exec(`node main.js -p ${moduleName}`);
}
