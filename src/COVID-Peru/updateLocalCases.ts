import pptr from 'puppeteer-core';
import logger from '../shared/logger';
import * as file from '../shared/file';
import { TIME_STAMP } from '../shared/time';
import { updateWorldCases } from './updateWorldCases';
import { CHROME_PATH, COORDS_PATH, LOCALCASES } from '../shared/constants';


interface citiesInfo {
    city: any[],
    lat: number,
    lng: number,
    cases: number,
    deaths: number
}


interface totalInfo {
    updated: string, cases: number, recovered: number,  deaths: number, details: citiesInfo[]
}


const GOTO_OPTS: pptr.DirectNavigationOptions = { waitUntil: 'networkidle2' };
let newTotalInfo: totalInfo = { updated: '', cases: 0, recovered: 0,  deaths: 0, details: []};
let newCitiesInfo: citiesInfo[] = [];



export const updateLocalCases = async (): Promise<void> => {

    const coords: Array<any>  = await file.read( COORDS_PATH ).then(res => JSON.parse(res));
    const browser: pptr.Browser = await pptr.launch( { headless: true, executablePath: CHROME_PATH } );
    const page: pptr.Page = await browser.newPage();

    const frameURL  = await getFrameURL(page).catch( (err: Error) => logger(err.message) );
    const minsaData: any = await getMinsaData(page, frameURL).catch( (err: Error) => logger(err.message) );

    const citiesList = minsaData.cities.split('\n');
    const casesList  = [ 
        ...minsaData.cases.replace(/,/g, '').split('\n'), 
        ...minsaData.cases2.replace(/,/g, '').split('\n') 
    ];
    const deathsList = [ 
        ...minsaData.deaths.replace(/,/g, '').split('\n'), 
        ...minsaData.deaths2.replace(/,/g, '').split('\n') 
    ];

    newTotalInfo.cases  = parseInt(casesList[0]);
    newTotalInfo.deaths = parseInt(deathsList[0]);

    const republicaData: any = await getRepublicaData(page).catch( (err: Error) => logger(err.message) );
    const recoveredData = republicaData.grossRecovered.replace('.', '').split(':');

    newTotalInfo.recovered = parseInt(recoveredData[1].trim());

    await browser.close();

    analyzingChanges(citiesList, casesList, deathsList, coords);    
    updateFile();
}


async function getFrameURL(page: pptr.Page): Promise<void | string> {

    logger(`Ingresando a la página de ${LOCALCASES.CITIES.NAME}`)
    await page.goto( LOCALCASES.CITIES.WEB, GOTO_OPTS );

    for(const frame of page.mainFrame().childFrames()) {
        if(frame.url().includes('app.powerbi.com')) return frame.url();
    }
}


interface minsaDataRes {
    cities: string,
    cases: string,
    cases2: string,
    deaths: string,
    deaths2: string,
}


async function getMinsaData(page: pptr.Page, dataURL: any): Promise<void | minsaDataRes> {

    let res: void | minsaDataRes;

    logger(`Ingresando a la URL del iframe`);
    await page.goto( dataURL, GOTO_OPTS );

    logger('Consiguiendo la información de la página')
    return res = await page.evaluate( () => {

        let cities: string  = (<HTMLElement>document.querySelector("div[class='rowHeaders']")).innerText;

        let cases: string   = (<HTMLElement>document.querySelector("div[class='bodyCells'] > div > div > div:nth-child(3)")).innerText;
        let cases2: string  = (<HTMLElement>document.querySelector("div[class='bodyCells'] > div > div:nth-child(2) > div:nth-child(3)")).innerText;

        let deaths: string  = (<HTMLElement>document.querySelector("div[class='bodyCells'] > div > div > div:nth-child(4)")).innerText;
        let deaths2: string = (<HTMLElement>document.querySelector("div[class='bodyCells'] > div > div:nth-child(2) > div:nth-child(4)")).innerText;

        return {
            cities,
            cases,
            cases2,
            deaths,
            deaths2
        }
    })
    .catch( (err: Error) => logger(err.message) );
}


async function getRepublicaData(page: pptr.Page): Promise<void | { grossRecovered: string }> {

    let res: void | { grossRecovered: string };

    logger(`Ingresando a la página de ${LOCALCASES.RECOVERED.NAME}`);
    await page.goto( LOCALCASES.RECOVERED.URL, GOTO_OPTS );

    logger('Consiguiendo la información de la página')
    return res = await page.evaluate( () => {

        let grossRecovered: string = (<HTMLElement>document.querySelector("span[class='curados']")).innerText;

        return { grossRecovered }
    }).catch( (err: Error) => logger(err.message) );
}


function updateFile(): void {

    logger('Escribiendo la información')
    file.write(LOCALCASES.PATH, newTotalInfo, LOCALCASES.FILE)
        .then(() => { updateWorldCases() })
        .catch((err: Error) => { logger( err.message ) })
}


async function analyzingChanges(cities: any, cases: any, deaths: any, coords: any): Promise<void> {

    logger('Organizando la información')
    for (let i = 1; i < cities.length; i++) {

        let lat = 0, lng = 0;

        coords.forEach((coord: any) => {
        
            if( coord.city === cities[i] ) {

                lat = coord.lat;
                lng = coord.lng;
            }
        });

        newCitiesInfo.push({
            city: cities[i],
            lat,
            lng,
            cases: parseInt(cases[i].replace('.', '')),
            deaths: parseInt(deaths[i].replace('.', ''))
        });

    }

    newTotalInfo.updated = TIME_STAMP;
    newTotalInfo.details = newCitiesInfo;
}
