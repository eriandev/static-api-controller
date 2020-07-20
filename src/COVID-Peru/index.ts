import inquirer from 'inquirer';
import { updateWorldCases } from './updateWorldCases';
import { updateLocalCases } from './updateLocalCases';

const functions = ['Actualizar casos mundiales', 'Actualizar casos locales', 'Salir'];



async function showOptions() {

    const ans = await inquirer.prompt({
        type: 'list',
        name: 'chooseFunction',
        message: '¿Qué desea hacer?',
        choices: functions
    })

    switch (ans['chooseFunction']) {

        case functions[0]:
            console.log(functions[0]);
            updateWorldCases();
            break;

        case functions[1]:
            console.log(functions[1]);
            updateLocalCases();
            break;

        case functions[2]:
            console.log('Sesión terminada');
            break;

        default:
            break;
    }
}

export default showOptions;
