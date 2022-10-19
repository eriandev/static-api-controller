import { prompt } from 'inquirer'
import type { ListQuestionOptions } from 'inquirer'

import updateFeaturedList from './updateFeaturedList'
import updateReposList from './updateReposList'
import { GITHUB_USER } from '@/shared/constants'

const MODULE_NAME = 'portfolio'
const OPTIONS_TEXT = ['Update repository list', 'Update featured list', 'Exit']

async function showOptions (): Promise<void> {
  const questions: ListQuestionOptions = {
    type: 'list',
    name: 'chosenFunction',
    message: 'What do you want to do?',
    choices: OPTIONS_TEXT
  }

  const answers = await prompt([questions])

  switch (answers.chosenFunction) {
    case OPTIONS_TEXT[0]:
      console.info(OPTIONS_TEXT[0])
      await updateReposList(MODULE_NAME, GITHUB_USER)
      break

    case OPTIONS_TEXT[1]:
      console.info(OPTIONS_TEXT[1])
      await updateFeaturedList(MODULE_NAME, GITHUB_USER)
      break

    case OPTIONS_TEXT[2]:
      console.info('Session ended')
      break
  }
}

export default showOptions
