import { Select } from 'cliffy'
import { MODULES, MODULES_NAMES } from '@/shared/constants.ts'

export async function main() {
  const answer = await Select.prompt({
    message: 'Module to use:',
    options: MODULES_NAMES,
  })

  MODULES[answer.toLowerCase() as keyof typeof MODULES]()
}

main()
