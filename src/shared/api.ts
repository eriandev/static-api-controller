import { API_PATH } from '@/shared/constants.ts';

export async function uploadChanges(moduleName: string): Promise<void> {
  const process = Deno.run({
    cwd: API_PATH,
    cmd: ['node', 'main.js', '-p', moduleName],
  });

  await process.status();
}
