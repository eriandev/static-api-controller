import { API_PATH } from '@/shared/constants.ts';
import { getTimeStamp } from '@/shared/utils.ts';

export async function uploadChanges(moduleName: string): Promise<void> {
  if (!await addChanges()) return;
  if (!await commitChanges(`Update ${moduleName} at ${getTimeStamp()}`)) return;
  if (!await pushChanges()) return;
}

export async function addChanges() {
  console.info('[sac] Adding changes...');

  const process = Deno.run({
    cwd: API_PATH,
    cmd: ['git', 'add', '.'],
    stdin: 'null',
    stdout: 'null',
  });

  const processStatus = await process.status();
  if (!processStatus.success) {
    console.error('[sac] Failed to add changes');
    return false;
  }

  console.info('[sac] Added changes!');
  return true;
}

export async function commitChanges(message: string) {
  console.info('[sac] Saving changes...');

  if (!message) {
    console.error('[sac] Failed to save changes: commit message not found');
    return false;
  }

  const process = Deno.run({
    cwd: API_PATH,
    cmd: ['git', 'commit', '-m', `"${message}"`],
    stdin: 'null',
    stdout: 'null',
  });

  const processStatus = await process.status();
  if (!processStatus.success) {
    return false;
  }

  console.info('[sac] Changes saved!');
  return true;
}

export async function pushChanges(branch = 'main') {
  console.info('[sac]  Uploading the changes...');

  const process = Deno.run({
    cwd: API_PATH,
    cmd: ['git', 'push', '-u', 'origin', branch],
    stdin: 'null',
    stdout: 'null',
    stderr: 'null',
  });

  const processStatus = await process.status();
  if (!processStatus.success) {
    console.error('[sac] Failed to add changes');
    return false;
  }

  console.info('[sac] Changes uploaded!');
  return true;
}
