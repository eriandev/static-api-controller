import { Select } from 'cliffy';
import { main as updateFeaturedList } from '@/modules/portfolio/updateFeaturedList.ts';
import { main as updateReposList } from '@/modules/portfolio/updateReposList.ts';
import { GITHUB_USER } from '@/shared/constants.ts';

export async function main(): Promise<void> {
  const MODULE_NAME = 'Portfolio';
  const OPTIONS_TEXT = ['Update repository list', 'Update featured list', 'Exit'];

  const answer: string = await Select.prompt({
    message: 'What do you want to do?',
    options: OPTIONS_TEXT,
  });

  switch (answer) {
    case OPTIONS_TEXT[0]:
      console.log(OPTIONS_TEXT[0]);
      updateReposList(MODULE_NAME, GITHUB_USER);
      break;

    case OPTIONS_TEXT[1]:
      console.log(OPTIONS_TEXT[1]);
      updateFeaturedList(MODULE_NAME, GITHUB_USER);
      break;

    case OPTIONS_TEXT[2]:
      console.log('Session ended');
      break;
  }
}
