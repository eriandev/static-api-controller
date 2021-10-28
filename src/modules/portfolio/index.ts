import { prompt, ListQuestionOptions } from 'inquirer';
import updateReposList from './updateReposList';
import updateFeaturedList from './updateFeaturedList';

const MODULE_NAME = 'portfolio';
const OPTIONS_TEXT = ['Update repository list', 'Update featured list', 'Exit'];

async function showOptions(): Promise<void> {
  const questions: ListQuestionOptions = {
    type: 'list',
    name: 'chosenFunction',
    message: 'What do you want to do?',
    choices: OPTIONS_TEXT,
  };

  const answers = await prompt([questions]);

  switch (answers['chosenFunction']) {
    case OPTIONS_TEXT[0]:
      console.log(OPTIONS_TEXT[0]);
      updateReposList(MODULE_NAME, 'erianvc');
      break;

    case OPTIONS_TEXT[1]:
      console.log(OPTIONS_TEXT[1]);
      updateFeaturedList(MODULE_NAME, 'erianvc');
      break;

    case OPTIONS_TEXT[2]:
      console.log('Session ended');
      break;
  }
}

export default showOptions;
