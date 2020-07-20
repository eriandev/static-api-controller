import axios from 'axios';
import * as shell from 'shelljs';
import logger from '../shared/logger';
import * as file from '../shared/file';
import { WORLDCASES, API_PATH } from '../shared/constants';



export const updateWorldCases = async (): Promise<void> => {

    const worldCases = await getWorldCases();
    updateFile(worldCases);
}


async function getWorldCases(): Promise<string> {
    return await(await axios.get( WORLDCASES.URL )).data;
}


function updateFile(data: any): void {

    file.write( WORLDCASES.PATH, data, WORLDCASES.FILE )
        .then(() => { gitPushRepository() })
        .catch((err: Error) => { logger(err.message) })
}

function gitPushRepository() {
    shell.cd(API_PATH)
    shell.exec("node main.js -p COVID-Peru")
}