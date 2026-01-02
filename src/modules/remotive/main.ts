import { Select } from 'cliffy'
import { main as updateJobsList } from '@/modules/remotive/updateJobsList.ts'

export async function main() {
  const MODULE_NAME = 'Remotive'
  const OPTIONS_TEXT = ['Update jobs list', 'Exit']

  const answer: string = await Select.prompt({
    message: 'What do you want to do?',
    options: OPTIONS_TEXT,
  })

  switch (answer) {
    case OPTIONS_TEXT[0]:
      console.log(OPTIONS_TEXT[0])
      updateJobsList(MODULE_NAME)
      break

    case OPTIONS_TEXT[1]:
      console.log('Session ended')
      break
  }
}
