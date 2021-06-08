const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");

const existeUsuarioPorId = async(id) => {

    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El id no existe: ${id}`)
    }
};

const emailExiste = async(email = "") => {

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El mail ${email} ya esta registrado en la db`)
    }
};

const emailNoExiste = async(email = "") => {

    const existeEmail = await Usuario.findOne({ email });
    if (!existeEmail) {
        throw new Error(`El mail ${email} no esta registrado en la db`)
    }
};

module.exports = {
    existeUsuarioPorId,
    emailExiste,
    emailNoExiste,
};