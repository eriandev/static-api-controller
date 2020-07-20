const logger = (msg: string, type: number = 1) => {

    switch (type) {
        case 1:
            console.log(`\n${msg}`);
            break;
        
        case 2:
            console.error(`\n${msg}`);
            break;
    
        default:
            console.log(`\n${msg}`);
            break;
    }

    
}

export default logger;
