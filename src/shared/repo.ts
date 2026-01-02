import { API_PATH } from '@/shared/constants.ts'
import { getTimeStamp } from '@/shared/utils.ts'

export async function uploadChanges(moduleName: string) {
  try {
    await addChanges()
    await commitChanges(`Update \`${moduleName}\` at ${getTimeStamp()}`)
    await pushChanges()
  } catch (error) {
    const { message } = error as Error
    console.log(`[sac:error] ${message}`)
  }
}

export async function addChanges() {
  console.info('[sac] Adding changes...')

  const command = new Deno.Command('git', {
    cwd: API_PATH,
    args: ['add', '.'],
    stdin: 'null',
    stdout: 'null',
  })

  const { success } = await command.output()
  if (!success) throw new Error('Failed to add changes')

  console.info('[sac] Added changes!')
}

export async function commitChanges(message: string) {
  console.info('[sac] Saving changes...')

  if (!message) throw new Error('Failed to save changes: commit message not found')

  const command = new Deno.Command('git', {
    cwd: API_PATH,
    args: ['commit', '-m', `${message}`],
    stdin: 'null',
    stdout: 'null',
  })

  const { success } = await command.output()
  if (!success) throw new Error('Failed to commit changes')

  console.info('[sac] Changes saved!')
}

export async function pushChanges(branch = 'main') {
  console.info('[sac]  Uploading the changes...')

  const command = new Deno.Command('git', {
    cwd: API_PATH,
    args: ['push', '-u', 'origin', branch],
    stdin: 'null',
    stdout: 'null',
    stderr: 'null',
  })

  const { success } = await command.output()
  if (!success) throw new Error('Failed to push changes')

  console.info('[sac] Changes uploaded!')
}
