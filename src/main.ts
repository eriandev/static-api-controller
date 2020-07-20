import inquirer from 'inquirer'
import project1 from './COVID-Peru'

const projects = ['COVID-Peru', 'Salir'];



(async () => {

    console.clear()

    const ans = await inquirer.prompt({
        type: 'list',
        name: 'chooseProject',
        message: '¿Con qué proyecto trabajar?',
        choices: projects
    })

    switch (ans['chooseProject']) {

        case projects[0]:
            console.log('Ingresando a COVID-Peru');
            project1();
            break;

        case projects[1]:
            console.log('Sesión terminada');
            break;
    
        default:
            break;
    }
})();
