const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        (argv.completado === 'true') ? texto = 'Tareas Realizadas': texto = 'Por Hacer';
        let listado = porHacer.getListado(argv.completado);
        for (let tarea of listado) {
            console.log(`========= ${texto} ============`.green);
            console.log(tarea.desc);
            console.log(`Estado: ${tarea.completado}`);
            console.log('================================'.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('El comando no se ha reconocido');
}