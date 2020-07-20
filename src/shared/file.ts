import fs from 'fs';
import logger from './logger';

export const write = (pathFile: string | Buffer | import('url').URL, data: any, fileName: string): Promise<void> => {

    return new Promise((resolve, reject) => {
        
        fs.writeFile(pathFile, JSON.stringify(data), (err) => {
            if (err) return reject(err);
            resolve(logger(`Archivo ${fileName} actualizado`))
        });
    });
}

export const read = (pathFile: string | Buffer | import('url').URL): Promise<string> => {

    return new Promise((resolve, reject) => {
        
        fs.readFile(pathFile, 'utf-8', (err, data) => {
            if (err) return reject(err);
            resolve( data )
        });
    });
}
