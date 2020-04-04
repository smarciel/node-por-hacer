const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('database/data.json', data, (err) => {
        if (err) {
            throw new Error('Ha habido un error');
        }
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../database/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = (completado) => {
    cargarDB();
    return listadoPorHacer.filter(tarea => tarea.completado === completado);
}

const crear = (desc) => {
    cargarDB();
    let porHacer = {
        desc,
        completado: "false"
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const actualizar = (desc, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.desc === desc);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (desc) => {
    cargarDB();
    let listadoSinTarea = listadoPorHacer.filter(tarea => tarea.desc !== desc);
    if (listadoSinTarea.length !== listadoPorHacer.length) {
        listadoPorHacer = listadoSinTarea;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}