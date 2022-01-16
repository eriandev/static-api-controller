import { prompt } from 'inquirer';
import type { ListQuestionOptions } from 'inquirer';
import updateJobsList from './updateJobsList';

const MODULE_NAME = 'remotive';
const OPTIONS_TEXT = ['Update jobs list', 'Exit'];

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
      updateJobsList(MODULE_NAME);
      break;

    case OPTIONS_TEXT[1]:
      console.log('Session ended');
      break;
  }
}

export default showOptions;
