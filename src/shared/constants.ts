import path from 'path';
import { _CHROME, _LOCAL, _WORLD, _API } from '../local_paths'

export const CHROME_PATH = _CHROME

/******************************************************************************************/
/*************************************** COVID-Peru ***************************************/
/******************************************************************************************/

export const COORDS_PATH = path.resolve('src/COVID-Peru/coords.json');

export const LOCALCASES = {
    PATH: _LOCAL,
    FILE: 'local-cases.json',
    RECOVERED: {
        NAME: 'La República',
        URL: 'https://larepublica.pe/coronavirus-en-el-peru/'
    },
    CITIES: {
        NAME: 'Ministerio de Salud',
        WEB: 'https://covid19.minsa.gob.pe/sala_situacional.asp'
    }
}

export const WORLDCASES = {
    PATH: _WORLD,
    FILE: 'world-cases.json',
    NAME: 'NovelCovid',
    URL: 'https://corona.lmao.ninja/v2/all'
}

export const API_PATH = _API