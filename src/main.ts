import { prompt, ListQuestionOptions } from 'inquirer';
import { MODULES_PATH } from './shared/constants';
import { getDirectoriesNames } from './shared/file';

const modules = getDirectoriesNames(MODULES_PATH);

(async (): Promise<void> => {
  const questions: ListQuestionOptions = {
    type: 'list',
    name: 'chosenModule',
    message: 'Module to use:',
    choices: modules,
  };

  const answers = await prompt([questions]);

  const { default: chosenModule } = await import(`./modules/${answers.chosenModule}`);

  chosenModule();
})();
