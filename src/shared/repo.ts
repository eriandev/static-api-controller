import { API_PATH } from '@/shared/constants.ts';
import { getTimeStamp } from '@/shared/utils.ts';

export async function uploadChanges(moduleName: string): Promise<void> {
  if (!await addChanges()) return;
  if (!await commitChanges(`Update \`${moduleName}\` at ${getTimeStamp()}`)) return;
  if (!await pushChanges()) return;
}

export async function addChanges() {
  console.info('[sac] Adding changes...');

  const command = new Deno.Command('git', {
    cwd: API_PATH,
    args: ['add', '.'],
    stdin: 'null',
    stdout: 'null',
  });

  const { success } = await command.output();
  if (!success) {
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

  const command = new Deno.Command('git', {
    cwd: API_PATH,
    args: ['commit', '-m', `${message}`],
    stdin: 'null',
    stdout: 'null',
  });

  const { success } = await command.output();
  if (!success) return false;

  console.info('[sac] Changes saved!');
  return true;
}

export async function pushChanges(branch = 'main') {
  console.info('[sac]  Uploading the changes...');

  const command = new Deno.Command('git', {
    cwd: API_PATH,
    args: ['push', '-u', 'origin', branch],
    stdin: 'null',
    stdout: 'null',
    stderr: 'null',
  });

  const { success } = await command.output();
  if (!success) {
    console.error('[sac] Failed to add changes');
    return false;
  }

  console.info('[sac] Changes uploaded!');
  return true;
}
