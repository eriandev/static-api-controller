import { Octokit } from '@octokit/rest';
import { writeJSON } from '../../shared/file';
import { uploadChanges } from '../../shared/api';
import { PORTFOLIO_MODULE_PATH } from '../../shared/constants';

const octokit = new Octokit();
const REPOS_PATH = `${PORTFOLIO_MODULE_PATH}repos/index.json`;

async function updateReposList(moduleName: string, username: string): Promise<void> {
  const { data } = await octokit.rest.repos.listForUser({ username });
  await writeJSON(REPOS_PATH, JSON.stringify(data));
  uploadChanges(moduleName);
}

export default updateReposList;
