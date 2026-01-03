import { Select } from 'cliffy'
import { GITHUB_USER } from '@/shared/constants.ts'
import { main as updateReposList } from '@/modules/github/update-repos-list.ts'
import { main as updateFeaturedList } from '@/modules/github/update-featured-list.ts'

export async function main() {
  const MODULE_NAME = 'Github'
  const OPTIONS_TEXT = ['Update repository list', 'Update featured list', 'Exit']

  const answer: string = await Select.prompt({
    message: 'What do you want to do?',
    options: OPTIONS_TEXT,
  })

  switch (answer) {
    case OPTIONS_TEXT[0]:
      console.log(OPTIONS_TEXT[0])
      updateReposList(MODULE_NAME, GITHUB_USER)
      break

    case OPTIONS_TEXT[1]:
      console.log(OPTIONS_TEXT[1])
      updateFeaturedList(MODULE_NAME, GITHUB_USER)
      break

    case OPTIONS_TEXT[2]:
      console.log('Session ended')
      break
  }
}
