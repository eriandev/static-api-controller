import { prompt, ListQuestionOptions } from 'inquirer';
import { MODULES_PATH } from './shared/constants';
import { getDirectoriesNames } from './shared/files';

const modules = getDirectoriesNames(MODULES_PATH);

(async (): Promise<void> => {
  const questions: ListQuestionOptions = {
    type: 'list',
    name: 'chosenModule',
    message: 'Módulo a usar:',
    choices: modules,
  };

  const answers = await prompt([questions]);

  const { default: chosenModule } = await import(
    `./modules/${answers.chosenModule}`
  );

  chosenModule();
})();
